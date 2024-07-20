let currentUser = null;
let users = [];
let posts = [];

// 페이지 로드 시 데이터 불러오기
function loadData() {
    const storedUsers = localStorage.getItem('users');
    const storedPosts = localStorage.getItem('posts');
    const storedCurrentUser = localStorage.getItem('currentUser');

    if (storedUsers) users = JSON.parse(storedUsers);
    if (storedPosts) posts = JSON.parse(storedPosts);
    if (storedCurrentUser) {
        currentUser = JSON.parse(storedCurrentUser);
        document.getElementById('authSection').classList.add('hidden');
        document.getElementById('postSection').classList.remove('hidden');
        displayPosts();
    }
}

// 데이터를 로컬 스토리지에 저장
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('posts', JSON.stringify(posts));
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('currentUser');
    }
}

// 회원가입 기능
function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    if (username && password) {
        users.push({ username, password });
        saveData();
        alert('회원가입이 완료되었습니다! 로그인해주세요.');
    } else {
        alert('사용자명과 비밀번호를 모두 입력해주세요.');
    }
}

// 로그인 기능
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        saveData();
        document.getElementById('authSection').classList.add('hidden');
        document.getElementById('postSection').classList.remove('hidden');
        displayPosts();
    } else {
        alert('사용자명 또는 비밀번호가 잘못되었습니다.');
    }
}

// 로그아웃 기능
function logout() {
    currentUser = null;
    saveData();
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('postSection').classList.add('hidden');
}

// 게시물 저장 기능
function savePost() {
    const content = document.getElementById('postContent').value;
    if (content) {
        posts.push({ user: currentUser.username, content });
        document.getElementById('postContent').value = '';
        saveData();
        displayPosts();
    }
}

// 게시물 표시 기능
function displayPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.textContent = `${post.user}: ${post.content}`;
        postsDiv.appendChild(postElement);
    });
}

// 페이지 로드 시 데이터 불러오기
loadData();
