
const { hash } = require("../../utils/hashPassword");
const User = require("../../models/user.model");
const Team = require("../../models/team.model");
const httpStatusText = require("../../utils/httpStatusText");
const sendInvitationEmail = require("../../services/sendInvitationEmail");
const generateRandomPassword = require("../../utils/generateRandomPassword");


const InviteMember = async (req, res) => {
    const userId = req.user.id;
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "Email is required",
            });
        }

        // ========================
        // 1. FIND OR CREATE USER
        // ========================
        let user = await User.findOne({ email });
        let isNewUser = false;
        let plainPassword;

        if (!user) {
            plainPassword = generateRandomPassword();
            const hashedPassword = await hash(plainPassword);

            user = await User.create({
                email,
                password: hashedPassword,
                createdBy: userId,
                isActive: true,
                isVerified: false
            });

            isNewUser = true;
        }

        // ========================
        // 2. GET OWNER TEAM
        // ========================
        let team = await Team.findOne({ owner: userId });


        if (!team) {
            team = await Team.create({
                owner: userId,
                members: []
            });
        }

        // ========================
        // 3. ADD USER TO TEAM
        // ========================
        const alreadyExists = team.members.some(
            (id) => id.toString() === user._id.toString()
        );

        if (!alreadyExists) {
            team.members.push(user._id);
            await team.save();
        }

        const leader = await User.findById(userId);
        // console.log('userId =', userId)
        // console.log('leader =', leader)
        await sendInvitationEmail({
            to: email,
            password: plainPassword,
            from: leader
        });


        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Member added to your team successfully",
            data: {
                userId: user._id
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error",
        });
    }
};

const TeamMembers = async (req, res) => {
    const userId = req.user.id;
    try {
        if (!userId) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "userId is required",
            });
        }
        let team = await Team.findOne({ owner: userId }).populate('members');
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: team?.members.length ? "get team successfully" : "Team not found",
            data: {
                members: team?.members || []
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error",
        });
    }
}


module.exports = {
    InviteMember,
    TeamMembers
};