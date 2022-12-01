import { getWorkshops, createParticipant, checkAuth } from '../fetch-utils.js';
import { renderOption } from '../render-utils.js';

const workshopSelect = document.getElementById('workshops');
const form = document.getElementById('new-participant');
const addBtn = document.getElementById('back');

checkAuth();
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    form.reset();
    await createParticipant({
        name: formData.get('name'),
        contact_info: formData.get('contact'),
        workshop_id: formData.get('workshop_id'),
    });
    window.location.replace = '/workshops';
});
async function onLoad() {
    const workshops = await getWorkshops();
    for (let workshop of workshops) {
        const workshopOpt = renderOption(workshop);
        workshopSelect.append(workshopOpt);
    }
}
onLoad();

// addBtn.addEventListener('click', () => {
//     window.location.href = '/workshops';
// });
