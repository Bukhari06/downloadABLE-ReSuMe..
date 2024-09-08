
// Declare jsPDF globally (from the CDN in the HTML file)
declare const jsPDF: any;

function generatePDF() {
    const doc = new jsPDF();
    doc.text("Hello, world!", 10, 10); // Add some text to the PDF
    doc.save("document.pdf"); // Save the PDF with the name 'document.pdf'
}

// Function to populate the resume preview
function populateResumePreview() {
    const resumePreview = document.getElementById("resumePreview");
    const username = (document.getElementById("username") as HTMLInputElement).value;

    if (resumePreview) {
        // Populate the resume sections
        resumePreview.innerHTML = `
            <h2>${username}'s Resume</h2>
            <p>Education: [Your Education Here]</p>
            <p>Work Experience: [Your Work Experience Here]</p>
            <p>Skills: [Your Skills Here]</p>
        `;
    }
}

// Function to download the resume
async function downloadResume(): Promise<void> {
    const pdf = new jsPDF();
    const resumePreview = document.getElementById("resumePreview");

    if (resumePreview) {
        const resumeContent = resumePreview.innerText; // Get text content
        const lines = resumeContent.split("\n").filter(line => line.trim() !== "");

        lines.forEach((line, index) => {
            pdf.text(line, 10, 10 + (index * 10)); // Add text to PDF
        });

        pdf.save("resume.pdf"); // Save PDF
    } else {
        console.error("Resume preview not found.");
    }
}

// Function to share the resume
function shareResume(): void {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const shareableLink = `https://yourwebsite.com/resume/${username}`;
    alert(`Share your resume using this link: ${shareableLink}`);
}

// Add event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("downloadResume")?.addEventListener("click", downloadResume);
    document.getElementById("shareResume")?.addEventListener("click", shareResume);
    
    // Update resume preview whenever the username input changes
    document.getElementById("username")?.addEventListener("input", populateResumePreview);
});
