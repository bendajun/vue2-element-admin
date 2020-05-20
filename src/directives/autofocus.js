export default {
  name: 'autofocus',
  inserted(el) {
    const input = el.querySelector('input');
    input && input.focus();
  }
}
