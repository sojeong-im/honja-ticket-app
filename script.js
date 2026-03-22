document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const screens = {
        login: document.getElementById('login-screen'),
        selection: document.getElementById('selection-screen'),
        loading: document.getElementById('loading-screen'),
        ticket: document.getElementById('ticket-screen'),
    };

    // Elements
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const welcomeMsg = document.getElementById('welcome-msg');
    
    const optionBtns = document.querySelectorAll('.option-btn');
    const backBtn = document.getElementById('back-btn');
    const acceptBtn = document.getElementById('accept-ticket');
    const ticketElem = document.getElementById('generated-ticket');
    const ticketFront = document.getElementById('ticket-front');
    
    // Modal
    const createModal = document.getElementById('create-modal');
    const showCreateBtn = document.getElementById('show-create-modal');
    const closeBtn = document.getElementById('close-modal');
    const submitTicketBtn = document.getElementById('submit-ticket');

    let currentUser = "익명";

    // 날짜
    const today = new Date();
    document.getElementById('ticket-date').textContent = 
        `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    // 기본 시크릿 바우처 데이터 (실제 동아리 활동같은 고퀄리티 사진 URL 적용)
    const ticketData = {
        'E': [
            { title: "볼링장 전세내고 피자 파티", desc: "시원하게 스트라이크 치고 피자 먹을 분! 진 팀이 음료수 쏘기입니다.", time: "19:00", members: "4", current: 1, host: "박지성", bg: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&q=80" },
            { title: "한강 따릉이 & 야경 출사", desc: "야경 보면서 반포대교까지 따릉이 달립니다. 예쁜 인증샷 남겨요!", time: "20:00", members: "5", current: 2, host: "김한강", bg: "https://images.unsplash.com/photo-1513622470522-26cb3341b528?w=600&q=80" }
        ],
        'I': [
            { title: "서촌 독립서점 조용히 투어", desc: "각자 좋아하는 책 한 권씩 고르고, 카페에서 말없이 책만 읽을 파티장소.", time: "15:00", members: "3", current: 1, host: "최수진", bg: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80" },
            { title: "비오는 날 엘피(LP)바", desc: "음악에만 집중할 수 있는 어둑한 LP바. 조용히 음악 들으며 힐링해요.", time: "21:00", members: "2", current: 1, host: "이무드", bg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" }
        ],
        'STUDY': [
            { title: "도서관 오픈런 러닝 파티", desc: "아침 8시! 도서관에서 좋은 자리 맡고 모닝 커피 마셔요.", time: "08:00", members: "4", current: 2, host: "김열공", bg: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
            { title: "새벽 2시 안암 24시 국밥", desc: "밤샘 공부하다가 잠시 국밥 한 그릇 때리고 오실 분 구합니다.", time: "02:00", members: "3", current: 1, host: "배고픔", bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" }
        ],
        'RANDOM': [
            { title: "즉흥 바다 드라이브", desc: "쏘카 빌렸습니다. 그냥 아무 데나 가서 바다 보고 오실 낭만파 1명 구함.", time: "23:00", members: "2", current: 1, host: "조즉흥", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" }
        ]
    };

    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // 로그인 로직
    loginBtn.addEventListener('click', () => {
        const name = usernameInput.value.trim();
        if(!name) {
            alert("닉네임을 입력해주세요!");
            return;
        }
        currentUser = name;
        welcomeMsg.textContent = `${currentUser}님, 환영합니다!`;
        showScreen('selection');
    });

    // 티켓 발급 로직
    function generateTicket(type) {
        showScreen('loading');
        
        setTimeout(() => {
            const options = ticketData[type];
            const randomPick = options[Math.floor(Math.random() * options.length)];
            
            document.getElementById('ticket-host-name').textContent = randomPick.host;
            document.getElementById('ticket-title').textContent = randomPick.title;
            document.getElementById('ticket-desc').textContent = randomPick.desc;
            document.getElementById('ticket-time').textContent = randomPick.time;
            document.getElementById('ticket-members').textContent = `${randomPick.current}/${randomPick.members}`;
            
            // 배경 이미지 적용 (업로드한 이미지가 있으면 그것, 아니면 기본 예쁜 배경)
            const bgUrl = randomPick.bg || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80";
            ticketFront.style.backgroundImage = `url('${bgUrl}')`;

            // 버튼 초기화
            acceptBtn.textContent = "이 티켓 수락하기";
            acceptBtn.style.background = "linear-gradient(135deg, var(--accent-color), var(--accent-glow))";
            acceptBtn.style.boxShadow = "0 4px 15px rgba(236, 72, 153, 0.3)";

            showScreen('ticket');
            
            setTimeout(() => {
                ticketElem.classList.add('revealed');
            }, 50);

        }, 1500);
    }

    // 무드 선택 메뉴
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            generateTicket(type);
        });
    });

    // 티켓 닫기
    backBtn.addEventListener('click', () => {
        ticketElem.classList.remove('revealed');
        showScreen('selection');
    });

    // 티켓 수락
    acceptBtn.addEventListener('click', () => {
        acceptBtn.textContent = "수락 & 매칭 완료 ✓";
        acceptBtn.style.background = "#10b981"; // emerald
        acceptBtn.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.4)";
        setTimeout(() => {
            alert("은밀한 큐레이터가 모임 방으로 당신을 초대합니다! (채팅방 이동 시뮬레이션)");
        }, 300);
    });

    // 모달 컨트롤 (새 모임 만들기)
    showCreateBtn.addEventListener('click', () => createModal.classList.add('active'));
    closeBtn.addEventListener('click', () => createModal.classList.remove('active'));

    // 티켓 생성(모임 등록) 로직
    submitTicketBtn.addEventListener('click', () => {
        const type = document.getElementById('new-type').value;
        const title = document.getElementById('new-title').value;
        const desc = document.getElementById('new-desc').value;
        const time = document.getElementById('new-time').value;
        const members = document.getElementById('new-members').value;

        if(!title || !desc || !time || !members) {
            alert("모든 정보를 입력해주세요!");
            return;
        }

        // 새로운 데이터 푸시 (방금 호스트가 된 나의 모임)
        ticketData[type].push({
            title: title,
            desc: desc,
            time: time,
            members: members,
            current: 1, // 방제작자 1명
            host: currentUser,
            bg: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80" // 이벤트 파티용 기본 배경 (실제는 사진 업로드)
        });

        alert("모집 티켓이 시크릿 바우처함에 등록되었습니다!");
        
        // 폼 초기화 및 닫기
        document.getElementById('new-title').value = '';
        document.getElementById('new-desc').value = '';
        document.getElementById('new-time').value = '';
        document.getElementById('new-members').value = '';
        createModal.classList.remove('active');
    });
});
