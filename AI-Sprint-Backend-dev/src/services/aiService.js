

const { default: buildPrompt } = require("../utils/taskPrompt");
const AI_MODEL = 'Qwen/Qwen2.5-7B-Instruct:together';

const generateTask = async (projectName, description) => {

    const prompt = buildPrompt(projectName, description);
    try {
        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: [{ role: "user", content: prompt }]
            })
        });

        const result = await response.json();
        let text = result.choices?.[0]?.message?.content || "";

        // // clean response
        text = text.trim().replace(/```/g, '');
        const first = text.indexOf('{');
        const last = text.lastIndexOf('}');
        if (first !== -1 && last !== -1) {
            text = text.substring(first, last + 1);
        }

        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch {
            console.warn("⚠ Invalid JSON");
            return null;
        }

        // console.log('tasks parsed --------- ', parsed)
        return parsed;

    } catch (error) {
        console.error("❌ Error generating tasks:", error.message);
        return null;
    }
};

module.exports = { generateTask };