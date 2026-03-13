const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

let roadmapData = {};

try {
    const data = fs.readFileSync(path.join(__dirname, "../roadmaps.json"), "utf8");
    roadmapData = JSON.parse(data);
} catch (error) {
    console.error("Error loading roadmaps.json:", error);
}

function generateGenericRoadmap(career) {
    const careerTitle = career.charAt(0).toUpperCase() + career.slice(1);
    const careerLower = career.toLowerCase();
    
    // Enhanced roadmap with more detailed and attractive steps
    const roadmapSteps = [
        {
            title: "🎯 Discover & Explore",
            description: `Begin your journey into ${career} by exploring what the role entails, understanding industry trends, and identifying the key skills required. Research successful professionals and learn from their career paths.`,
            level: "Beginner",
            duration: "2-4 Weeks",
            tags: ["Research", "Career Planning", "Industry Insights"],
            icon: "fa-compass"
        },
        {
            title: "📚 Master the Fundamentals",
            description: `Build a strong foundation by learning core concepts, terminology, and essential knowledge for ${career}. Take online courses, read books, and follow industry leaders to understand the basics thoroughly.`,
            level: "Beginner",
            duration: "2-3 Months",
            tags: ["Basics", "Foundation", "Learning"],
            icon: "fa-book-open"
        },
        {
            title: "💪 Develop Core Skills",
            description: `Focus on building technical and practical skills specific to ${career}. Practice daily, work on tutorials, and complete structured courses to strengthen your capabilities.`,
            level: "Intermediate",
            duration: "3-4 Months",
            tags: ["Skills Development", "Practice", "Training"],
            icon: "fa-dumbbell"
        },
        {
            title: "🛠️ Build Real Projects",
            description: `Apply your knowledge by creating real-world projects that solve actual problems. Build a portfolio showcasing your work, contribute to open-source, or take on freelance projects to gain hands-on experience.`,
            level: "Intermediate",
            duration: "4-6 Months",
            tags: ["Projects", "Portfolio", "Hands-on"],
            icon: "fa-hammer"
        },
        {
            title: "🚀 Master Advanced Concepts",
            description: `Deep dive into advanced topics, specialized areas, and cutting-edge technologies in ${career}. Learn industry best practices, optimization techniques, and stay updated with latest trends.`,
            level: "Advanced",
            duration: "3-5 Months",
            tags: ["Advanced", "Specialization", "Expertise"],
            icon: "fa-rocket"
        },
        {
            title: "🎓 Get Certified & Network",
            description: `Obtain relevant professional certifications to validate your skills. Attend conferences, join communities, connect with industry professionals on LinkedIn, and build meaningful relationships.`,
            level: "Advanced",
            duration: "2-3 Months",
            tags: ["Certification", "Networking", "Community"],
            icon: "fa-award"
        },
        {
            title: "💼 Land Your Dream Job",
            description: `Polish your resume, create an impressive LinkedIn profile, prepare for technical and behavioral interviews, and start applying for ${career} positions. Practice mock interviews and negotiate your offers confidently.`,
            level: "Ready",
            duration: "1-2 Months",
            tags: ["Job Search", "Interview Prep", "Career Launch"],
            icon: "fa-briefcase"
        },
        {
            title: "📈 Continuous Growth",
            description: `Keep learning and evolving in your ${career} journey. Stay updated with industry changes, mentor others, contribute to the community, and continuously improve your skills to advance in your career.`,
            level: "Expert",
            duration: "Ongoing",
            tags: ["Growth", "Mentorship", "Leadership"],
            icon: "fa-chart-line"
        }
    ];
    
    return {
        title: careerTitle,
        description: `🌟 A comprehensive, step-by-step learning path designed to help you become a successful ${career}. Follow this roadmap to transform your career aspirations into reality!`,
        steps: roadmapSteps
    };
}

router.get("/", (req, res) => {
    const { career } = req.query;

    if (!career) {
        return res.status(400).json({ error: "Career parameter is required" });
    }

    const careerKey = career.trim();
    let roadmap = roadmapData[careerKey];

    if (!roadmap) {
        const lowerKey = Object.keys(roadmapData).find(k => k.toLowerCase() === careerKey.toLowerCase());
        if (lowerKey) {
            roadmap = roadmapData[lowerKey];
        }
    }

    if (!roadmap) {
        roadmap = generateGenericRoadmap(career);
    }

    res.json(roadmap);
});

module.exports = router;
