export default function removeConfigMenu() {
    const configMenu = document.getElementById('configMenu');
    configMenu.style.left = '-100%';
    configMenu.style.transition = 'left 0.5s ease-in-out';
}