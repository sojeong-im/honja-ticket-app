document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const screens = {
        landing: document.getElementById('landing-screen'),
        apply: document.getElementById('apply-screen'),
        selection: document.getElementById('selection-screen'),
        loading: document.getElementById('loading-screen'),
        ticket: document.getElementById('ticket-screen'),
    };

    // Routing Logic for Landing
    const goApplyBtn = document.getElementById('go-apply');
    const goTicketBtn = document.getElementById('go-ticket');
    const closeApplyBtn = document.getElementById('close-apply');
    const backFromSelectionBtn = document.getElementById('back-from-selection');

    goApplyBtn.addEventListener('click', () => showScreen('apply'));
    closeApplyBtn.addEventListener('click', () => showScreen('landing'));
    goTicketBtn.addEventListener('click', () => showScreen('selection'));
    backFromSelectionBtn.addEventListener('click', () => showScreen('landing'));

    // 내부 지원 폼 로직
    const submitApplicationBtn = document.getElementById('submit-application-btn');
    if(submitApplicationBtn) {
        submitApplicationBtn.addEventListener('click', () => {
            const name = document.getElementById('apply-name').value;
            const age = document.getElementById('apply-age').value;
            const school = document.getElementById('apply-school').value;
            const station = document.getElementById('apply-station').value;
            const mbti = document.getElementById('apply-mbti').value;
            const activity = document.getElementById('apply-activity').value;
            const contact = document.getElementById('apply-contact').value;
            
            if(!name || !age || !school || !station || !mbti || !contact) {
                alert("해보고 싶은 활동 이외의 모든 정보는 필수 입력 사항입니다!");
                return;
            }
            
            alert(`🎉 ${name}님 환영합니다!\n내부 지원서가 성공적으로 접수되었습니다.\n운영진이 곧 번호(${contact})로 연락드릴게요!`);
            
            // 초기화
            document.getElementById('apply-name').value = '';
            document.getElementById('apply-age').value = '';
            document.getElementById('apply-school').value = '';
            document.getElementById('apply-station').value = '';
            document.getElementById('apply-mbti').value = '';
            document.getElementById('apply-activity').value = '';
            document.getElementById('apply-contact').value = '';
            
            showScreen('landing');
        });
    }

    // Existing Elements
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

    // 날짜
    const today = new Date();
    document.getElementById('ticket-date').textContent = 
        `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    // 기본 시크릿 바우처 데이터
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
            
            const bgUrl = randomPick.bg || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80";
            ticketFront.style.backgroundImage = `url('${bgUrl}')`;

            acceptBtn.textContent = "이 모임 합류하기";
            acceptBtn.style.background = "linear-gradient(135deg, var(--accent-color), var(--accent-glow))";
            acceptBtn.style.boxShadow = "0 4px 15px rgba(236, 72, 153, 0.3)";

            showScreen('ticket');
            
            setTimeout(() => {
                ticketElem.classList.add('revealed');
            }, 50);

        }, 1500);
    }

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            generateTicket(type);
        });
    });

    backBtn.addEventListener('click', () => {
        ticketElem.classList.remove('revealed');
        showScreen('selection');
    });

    acceptBtn.addEventListener('click', () => {
        acceptBtn.textContent = "참여 완료! 호스트에게 알림 발송 ✓";
        acceptBtn.style.background = "#10b981"; // emerald
        acceptBtn.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.4)";
        setTimeout(() => {
            alert("환영합니다! 모임 전용 단톡방 링크가 모바일로 전송되었습니다. (시뮬레이션)");
        }, 500);
    });

    showCreateBtn.addEventListener('click', () => createModal.classList.add('active'));
    closeBtn.addEventListener('click', () => createModal.classList.remove('active'));

    submitTicketBtn.addEventListener('click', () => {
        const hostName = document.getElementById('new-host').value;
        const type = document.getElementById('new-type').value;
        const title = document.getElementById('new-title').value;
        const desc = document.getElementById('new-desc').value;
        const time = document.getElementById('new-time').value;
        const members = document.getElementById('new-members').value;

        if(!hostName || !title || !desc || !time || !members) {
            alert("주최자 닉네임을 포함한 모든 정보를 입력해주세요!");
            return;
        }

        ticketData[type].push({
            title: title, desc: desc, time: time, members: members, current: 1, host: hostName,
            bg: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80"
        });

        alert("모집 티켓이 발행되었습니다! 다른 멤버들이 바우처를 뽑을 때 노출됩니다.");
        
        document.getElementById('new-host').value = '';
        document.getElementById('new-title').value = '';
        document.getElementById('new-desc').value = '';
        document.getElementById('new-time').value = '';
        document.getElementById('new-members').value = '';
        createModal.classList.remove('active');
    });
});
