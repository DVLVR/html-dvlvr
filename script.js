// Create the pixels for the pixel art canvas
const canvas = document.querySelector('.canvas');
for (let i = 0; i < 64; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    canvas.appendChild(pixel);
}

const form = document.getElementById('memberForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/add_member', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            successMessage.style.display = 'block';
        } else {
            throw new Error('Error adding member');
        }
    } catch (error) {
        console.error(error);
    }
});