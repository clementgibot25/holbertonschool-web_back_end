import {createUser, uploadPhoto} from './utils.js';

function handleProfileSignup() {
    return Promise.all([createUser(), uploadPhoto()])
        .then((values) => {
            console.log(values);
        })
        .catch(() => {
            console.log('Signup system offline');
        });
}

export default handleProfileSignup;