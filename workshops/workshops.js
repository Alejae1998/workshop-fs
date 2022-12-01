/* Imports */
import { checkAuth, deleteParticipant, getWorkshops, signOutUser } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';

checkAuth();

/* Get DOM Elements */

/* State */

/* Events */

/* Display Functions */
async function displayWorkshops() {
    const main = document.querySelector('main');
    main.textContent = '';
    const data = await getWorkshops();
    for (let workshop of data) {
        const shopEl = renderWorkshop(workshop);
        const ul = document.createElement('ul');
        for (let participant of workshop.participants) {
            const li = document.createElement('li');
            li.textContent = `${participant.name}: ${participant.contact_info}`;
            li.addEventListener('click', async () => {
                await deleteParticipant(participant.id);
                displayWorkshops();
            });
            ul.append(li);
        }
        shopEl.append(ul);
        main.append(shopEl);
    }
}
displayWorkshops();

window.addEventListener('load', async () => {
    const shops = await getWorkshops();
    displayWorkshops(shops);
});
