const button = document.getElementById('clickBtn');
const message = document.getElementById('message');

button.addEventListener('click', () => {
  message.textContent = '좋아요! 버튼을 클릭했습니다.';
});
