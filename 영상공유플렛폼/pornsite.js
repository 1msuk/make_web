let currentUser = null;
let users = [];
let videos = [];

// 페이지 로드 시 데이터 불러오기
function loadData() {
    const storedUsers = localStorage.getItem('users');
    const storedVideos = localStorage.getItem('videos');
    const storedCurrentUser = localStorage.getItem('currentUser');

    if (storedUsers) users = JSON.parse(storedUsers);
    if (storedVideos) videos = JSON.parse(storedVideos);
    if (storedCurrentUser) {
        currentUser = JSON.parse(storedCurrentUser);
        showVideoSection();
    }
    updateNavMenu();
    displayVideos();
}

// 데이터 저장
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('videos', JSON.stringify(videos));
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('currentUser');
    }
}

// 회원가입
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if (username && password) {
        if (users.some(user => user.username === username)) {
            alert('이미 존재하는 사용자명입니다.');
            return;
        }
        users.push({ username, password });
        saveData();
        alert('회원가입이 완료되었습니다. 로그인해주세요.');
    } else {
        alert('사용자명과 비밀번호를 모두 입력해주세요.');
    }
}

// 로그인
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        saveData();
        showVideoSection();
    } else {
        alert('사용자명 또는 비밀번호가 잘못되었습니다.');
    }
}

// 로그아웃
function logout() {
    currentUser = null;
    saveData();
    showAuthSection();
}

// 비디오 섹션 표시
function showVideoSection() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('video-section').classList.remove('hidden');
    updateNavMenu();
}

// 인증 섹션 표시
function showAuthSection() {
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('video-section').classList.add('hidden');
    updateNavMenu();
}

// 네비게이션 메뉴 업데이트
function updateNavMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (currentUser) {
        navMenu.innerHTML = `
            <span>안녕하세요, ${currentUser.username}님</span>
            <button onclick="logout()">로그아웃</button>
        `;
    } else {
        navMenu.innerHTML = '';
    }
}

// 비디오 업로드
function uploadVideo() {
    const fileInput = document.getElementById('video-file');
    const title = document.getElementById('video-title').value;
    
    if (fileInput.files.length > 0 && title) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const videoData = e.target.result;
            videos.push({
                id: Date.now(),
                title: title,
                user: currentUser.username,
                data: videoData
            });
            saveData();
            displayVideos();
            fileInput.value = '';
            document.getElementById('video-title').value = '';
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('비디오 파일과 제목을 모두 입력해주세요.');
    }
}

// 비디오 목록 표시
function displayVideos() {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '<h2>공유된 비디오</h2>';
    videos.forEach(video => {
        const videoElem = document.createElement('div');
        videoElem.className = 'video-item';
        videoElem.innerHTML = `
            <h3>${video.title}</h3>
            <p>업로더: ${video.user}</p>
            <video controls>
                <source src="${video.data}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        videoList.appendChild(videoElem);
    });
}

// 페이지 로드 시 데이터 불러오기
loadData();
