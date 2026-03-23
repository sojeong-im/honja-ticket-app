document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const screens = {
        landing: document.getElementById('landing-screen'),
        apply: document.getElementById('apply-screen'),
        selection: document.getElementById('selection-screen'),
        list: document.getElementById('list-screen'),
        loading: document.getElementById('loading-screen'),
        ticket: document.getElementById('ticket-screen'),
    };

    // Navigation Buttons
    const goApplyBtn = document.getElementById('go-apply');
    const goTicketBtn = document.getElementById('go-ticket');
    const closeApplyBtn = document.getElementById('close-apply');
    const backFromSelectionBtn = document.getElementById('back-from-selection');
    const backFromListBtn = document.getElementById('back-from-list');
    const backFromTicketBtn = document.getElementById('back-from-ticket');

    goApplyBtn.addEventListener('click', () => showScreen('apply'));
    closeApplyBtn.addEventListener('click', () => showScreen('landing'));
    goTicketBtn.addEventListener('click', () => showScreen('selection'));
    backFromSelectionBtn.addEventListener('click', () => showScreen('landing'));
    backFromListBtn.addEventListener('click', () => showScreen('selection'));
    
    // 돌아가기: 티켓 화면에서 목록으로(status/type 유지)
    backFromTicketBtn.addEventListener('click', () => {
        document.getElementById('generated-ticket').classList.remove('revealed');
        showScreen('list');
    });

    // 지원 폼 처리
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

    // 데이터 초기 설정 (네이버 지도 실제 장소 반영 + 방문 여부)
    const ticketData = {
        'E': [
            { id: 'e1', title: "스트라이크 치고 피자 파티", place: "스매싱볼 강남점", desc: "시원하게 볼링 치고 피맥 쏘기!", time: "19:00", members: "4", current: 2, host: "박지성", status: "upcoming", bg: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&q=80" },
            { id: 'e2', title: "나이키 러닝크루 합류", place: "여의도 한강공원 광장", desc: "다 같이 호흡 맞추며 5km 러닝 인증샷!", time: "20:00", members: "5", current: 3, host: "런닝러", status: "upcoming", bg: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80" },
            { id: 'e3', title: "방탈출 1시간 컷 도전", place: "룸즈에이 홍대점", desc: "힌트 없이 빠르게 머리 써서 탈출 성공함!", time: "16:00", members: "4", current: 4, host: "코난", status: "visited", bg: "https://images.unsplash.com/photo-1574681608674-d4baedde66f9?w=600&q=80" }
        ],
        'I': [
            { id: 'i1', title: "서촌 브런치와 독서 모임", place: "어스핸드위치 서촌점", desc: "각자 좋아하는 책 가져가서 조용히 브런치 냠냠.", time: "11:00", members: "3", current: 1, host: "최수진", status: "upcoming", bg: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80" },
            { id: 'i2', title: "재즈바에서 와인 한 잔", place: "연남동 오아시스", desc: "서로 대화 없이 라이브 음악에만 집중할 파티원.", time: "21:00", members: "2", current: 1, host: "이무드", status: "upcoming", bg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" },
            { id: 'i3', title: "요시고 사진전 감상", place: "그라운드시소 서촌", desc: "사진전 조용히 보고 근처에서 차 마시고 헤어졌어요.", time: "14:00", members: "2", current: 2, host: "사진광", status: "visited", bg: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80" }
        ],
        'STUDY': [
            { id: 's1', title: "밤샘 코딩 모임", place: "작심스터디카페 신촌점", desc: "각자 할거 가져와서 새벽 2시까지 빡공.", time: "22:00", members: "4", current: 2, host: "김열공", status: "upcoming", bg: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
            { id: 's2', title: "도서관 오픈런 모닝 커피", place: "연세대학교 중앙도서관", desc: "아침 8시! 도서관에서 좋은 자리 맡고 빡공 완료.", time: "08:00", members: "3", current: 3, host: "얼리버드", status: "visited", bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" }
        ],
        'RANDOM': [
            { id: 'r1', title: "즉흥 야간 드라이브", place: "북악스카이웨이 팔각정", desc: "아무 생각 없이 바람 쐬러 쏘카 렌트 갈 사람.", time: "23:00", members: "2", current: 1, host: "조즉흥", status: "upcoming", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
            { id: 'r2', title: "급 육회에 막걸리", place: "광장시장 육회자매집", desc: "비 와서 급 땡겨서 먹방 제대로 찍고 옴.", time: "18:00", members: "4", current: 4, host: "먹보", status: "visited", bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" }
        ]
    };

    let currentListType = 'E';
    let currentTab = 'upcoming';

    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // 그룹 선택 시 목록 화면 렌더링
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentListType = btn.getAttribute('data-type');
            
            const titles = { 'E': '🔥 E조 방방곡곡', 'I': '🍵 I조 고요한 힐링', 'STUDY': '📚 시험기간조 집중구역', 'RANDOM': '✨ 랜덤조 즉흥기록' };
            document.getElementById('list-title').textContent = titles[currentListType];
            
            renderList();
            showScreen('list');
        });
    });

    // 탭(예정/다녀온곳) 클릭 처리
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.getAttribute('data-tab');
            renderList();
        });
    });

    // 리스트 렌더링
    function renderList() {
        const container = document.getElementById('ticket-list-container');
        container.innerHTML = '';
        
        const listData = ticketData[currentListType].filter(item => item.status === currentTab);
        
        if(listData.length === 0) {
            container.innerHTML = `<div class="empty-msg">앗! 등록된 모임 내역이 없습니다.</div>`;
            return;
        }

        listData.forEach(item => {
            const card = document.createElement('div');
            card.className = `list-card ${item.status === 'visited' ? 'visited' : ''}`;
            card.innerHTML = `
                <img src="${item.bg}" class="list-img" alt="배경">
                <div class="list-info">
                    <span class="list-place">📍 ${item.place}</span>
                    <h3>${item.title}</h3>
                    <span class="list-desc">${item.desc}</span>
                </div>
            `;
            
            // 모임 아이템 클릭 이벤트 (티켓 보기)
            card.addEventListener('click', () => {
                showTicket(item);
            });
            
            container.appendChild(card);
        });
    }

    // 티켓 생성(보기) 로직
    const acceptBtn = document.getElementById('accept-ticket');
    const ticketElem = document.getElementById('generated-ticket');
    const ticketFront = document.getElementById('ticket-front');

    function showTicket(item) {
        showScreen('loading');
        
        setTimeout(() => {
            document.getElementById('ticket-host-name').textContent = item.host;
            document.getElementById('ticket-title').textContent = item.title;
            document.getElementById('ticket-place').textContent = `📍 장소 : ${item.place}`;
            document.getElementById('ticket-desc').textContent = item.desc;
            document.getElementById('ticket-time').textContent = item.time;
            document.getElementById('ticket-members').textContent = `${item.current}/${item.members}`;
            ticketFront.style.backgroundImage = `url('${item.bg}')`;

            if(item.status === 'visited') {
                acceptBtn.textContent = "이미 다녀온 멋진 모임입니다 ✨";
                acceptBtn.disabled = true;
                acceptBtn.style.background = "rgba(255,255,255,0.2)";
                acceptBtn.style.boxShadow = "none";
            } else {
                acceptBtn.textContent = "이 모임 합류하기";
                acceptBtn.disabled = false;
                acceptBtn.style.background = "linear-gradient(135deg, var(--accent-color), var(--accent-glow))";
                acceptBtn.style.boxShadow = "0 4px 15px rgba(236, 72, 153, 0.3)";
            }

            document.getElementById('ticket-date').textContent = 
                `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

            showScreen('ticket');
            setTimeout(() => { ticketElem.classList.add('revealed'); }, 50);

        }, 800);
    }

    acceptBtn.addEventListener('click', () => {
        acceptBtn.textContent = "참여 완료! 호스트에게 알림 발송 ✓";
        acceptBtn.style.background = "#10b981"; // emerald
        acceptBtn.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.4)";
        setTimeout(() => {
            alert("환영합니다! 모임 전용 단톡방 링크가 모바일로 전송되었습니다.");
        }, 500);
    });

    // 새 모임 만들기 모달
    const createModal = document.getElementById('create-modal');
    const showCreateBtn = document.getElementById('show-create-modal');
    const closeBtn = document.getElementById('close-modal');
    const submitTicketBtn = document.getElementById('submit-ticket');

    showCreateBtn.addEventListener('click', () => createModal.classList.add('active'));
    closeBtn.addEventListener('click', () => createModal.classList.remove('active'));

    submitTicketBtn.addEventListener('click', () => {
        const hostName = document.getElementById('new-host').value;
        const type = document.getElementById('new-type').value;
        const place = document.getElementById('new-place').value;
        const title = document.getElementById('new-title').value;
        const desc = document.getElementById('new-desc').value;
        const time = document.getElementById('new-time').value;
        const members = document.getElementById('new-members').value;

        if(!hostName || !place || !title || !desc || !time || !members) {
            alert("주최자 닉네임과 장소를 포함한 모든 정보를 설정해주세요!");
            return;
        }

        ticketData[type].unshift({
            id: 'n_' + Date.now(),
            title: title, place: place, desc: desc, time: time, members: members, current: 1, host: hostName, status: "upcoming",
            bg: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80"
        });

        alert("목록에 훌륭한 모임이 등록되었습니다!");
        
        document.getElementById('new-host').value = '';
        document.getElementById('new-place').value = '';
        document.getElementById('new-title').value = '';
        document.getElementById('new-desc').value = '';
        document.getElementById('new-time').value = '';
        document.getElementById('new-members').value = '';
        createModal.classList.remove('active');
        
        // 리스트 새로고침
        if(document.getElementById('list-screen').classList.contains('active')) {
            renderList();
        }
    });

    // 배경 슬라이더 로직
    const slides = document.querySelectorAll('.bg-slider .slide');
    if(slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // 4초마다 변경
    }
});
