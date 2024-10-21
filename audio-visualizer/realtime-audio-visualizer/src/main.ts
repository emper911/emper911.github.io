import { App } from './App';
let app: App;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});

const startButton = document.getElementById('start-button');
startButton?.addEventListener('click', () => {
    app.setup();
})