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

    // 성향별 활동 리스트 설정 및 동적 렌더링
    const mbtiSelect = document.getElementById('apply-mbti');
    const activitiesContainer = document.getElementById('apply-activities-container');
    const selectedActivities = new Set();

    const activityOptions = {
        'E': ["한강 러닝크루 참여", "방탈출 카페 정복", "실내 클라이밍 도전", "밤샘 보드게임 파티", "노래방에서 텐션업", "볼링/포켓볼 내기", "한강 야외 치맥/피맥", "테마파크 투어", "쇼츠/댄스 챌린지", "야간 드라이브 번개"],
        'I': ["잔잔한 재즈바 방문", "독립서점 투어", "분위기 좋은 카페 탐방", "전시회/미술관 감상", "한강 피크닉 힐링", "북카페에서 각자 할 일", "심야 영화 관람", "공방 원데이 클래스", "소규모 LP바 감상", "고요한 밤 산책"],
        'A': ["핫플 웨이팅 후 카페투어", "즉흥 국내 뚜벅이 여행", "가벼운 등산 후 파전", "한강 따릉이 타기", "인생네컷 셀프 스튜디오", "방탈출 후 가벼운 저녁", "캐주얼한 와인/칵테일", "서울 핫플 골목 탐방", "소규모 홈파티", "대학로 연극 후 뒤풀이"]
    };

    if(mbtiSelect && activitiesContainer) {
        mbtiSelect.addEventListener('change', (e) => {
            const type = e.target.value;
            activitiesContainer.innerHTML = '';
            selectedActivities.clear();
            
            if(!type || !activityOptions[type]) {
                activitiesContainer.innerHTML = '<p class="empty-chip-msg">먼저 위에서 평소 성향을 선택해주세요!</p>';
                return;
            }
            
            activityOptions[type].forEach(act => {
                const chip = document.createElement('div');
                chip.className = 'chip';
                chip.textContent = act;
                chip.addEventListener('click', () => {
                    if(selectedActivities.has(act)) {
                        selectedActivities.delete(act);
                        chip.classList.remove('selected');
                    } else {
                        selectedActivities.add(act);
                        chip.classList.add('selected');
                    }
                });
                activitiesContainer.appendChild(chip);
            });
        });
    }

    // 지원 폼 처리
    const submitApplicationBtn = document.getElementById('submit-application-btn');
    if(submitApplicationBtn) {
        submitApplicationBtn.addEventListener('click', () => {
            const name = document.getElementById('apply-name').value;
            const age = document.getElementById('apply-age').value;
            const school = document.getElementById('apply-school').value;
            const station = document.getElementById('apply-station').value;
            const mbti = document.getElementById('apply-mbti').value;
            const contact = document.getElementById('apply-contact').value;
            const activityStr = Array.from(selectedActivities).join(', ');
            
            if(!name || !age || !school || !station || !mbti || !contact) {
                alert("해보고 싶은 활동을 제외한 모든 정보는 필수 입력 사항입니다!");
                return;
            }
            
            alert(`🎉 ${name}님 환영합니다!\n선택하신 활동: ${activityStr || '없음'}\n내부 지원서가 성공적으로 접수되었습니다.\n운영진이 곧 번호(${contact})로 연락드릴게요!`);
            
            // 초기화
            document.getElementById('apply-name').value = '';
            document.getElementById('apply-age').value = '';
            document.getElementById('apply-school').value = '';
            document.getElementById('apply-station').value = '';
            document.getElementById('apply-mbti').value = '';
            document.getElementById('apply-contact').value = '';
            
            if(activitiesContainer) {
                activitiesContainer.innerHTML = '<p class="empty-chip-msg">먼저 위에서 평소 성향을 선택해주세요!</p>';
            }
            selectedActivities.clear();
            
            showScreen('landing');
        });
    }

    // 데이터 초기 설정 (네이버 지도 실제 장소 반영 + 방문 여부)
    const ticketData = {
        'E': [
            { id: 'e1', title: "스트라이크 치고 피자 파티", place: "스매싱볼 강남점", desc: "시원하게 볼링 치고 피맥 쏘기!", time: "19:00", members: "4", current: 2, host: "박지성", status: "upcoming", bg: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&q=80" },
            { id: 'e2', title: "나이키 러닝크루 합류", place: "여의도 한강공원 광장", desc: "다 같이 호흡 맞추며 5km 러닝 인증샷!", time: "20:00", members: "5", current: 3, host: "런닝러", status: "upcoming", bg: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80" },
            { id: 'e3', title: "실내 클라이밍 첫 도전", place: "클라이머스 강남", desc: "초보도 가능한 볼더링 배우고 뿌링클 고", time: "14:00", members: "4", current: 2, host: "오운완", status: "upcoming", bg: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80" },
            { id: 'e4', title: "롯데월드 전세내기", place: "롯데월드 어드벤처", desc: "교복 빌려 입고 후렌치레볼루션 3번 타기", time: "10:00", members: "6", current: 6, host: "모험가", status: "visited", bg: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80" },
            { id: 'e5', title: "방탈출 1시간 컷 도전", place: "룸즈에이 홍대점", desc: "힌트 없이 빠르게 머리 써서 탈출 성공함!", time: "16:00", members: "4", current: 4, host: "코난", status: "visited", bg: "https://images.unsplash.com/photo-1574681608674-d4baedde66f9?w=600&q=80" }
        ],
        'I': [
            { id: 'i1', title: "서촌 브런치와 독서 모임", place: "어스핸드위치 서촌점", desc: "각자 좋아하는 책 가져가서 조용히 브런치 냠냠.", time: "11:00", members: "3", current: 1, host: "최수진", status: "upcoming", bg: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80" },
            { id: 'i2', title: "독립서점 탐방", place: "최인아책방 역삼점", desc: "조용히 책 고르고 각자 커피 마시며 쉬는 시간.", time: "15:00", members: "4", current: 2, host: "책벌레", status: "upcoming", bg: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80" },
            { id: 'i3', title: "라이브 재즈와 와인", place: "연남5701", desc: "대화 없이 그저 음악 감상하며 레드와인 한 잔.", time: "20:00", members: "2", current: 1, host: "이무드", status: "upcoming", bg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" },
            { id: 'i4', title: "요시고 사진전 감상", place: "그라운드시소 서촌", desc: "사진전 조용히 보고 근처에서 차 마시고 헤어졌어요.", time: "14:00", members: "2", current: 2, host: "사진광", status: "visited", bg: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80" },
            { id: 'i5', title: "도자기 공방 원데이", place: "오브제룸 안국", desc: "흙 만지며 잡념 없애기, 물레 체험 힐링 완료", time: "13:00", members: "3", current: 3, host: "손재주", status: "visited", bg: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80" }
        ],
        'STUDY': [
            { id: 's1', title: "밤샘 코딩 모임", place: "작심스터디카페 신촌점", desc: "각자 할거 가져와서 새벽 2시까지 빡공.", time: "22:00", members: "4", current: 2, host: "김열공", status: "upcoming", bg: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
            { id: 's2', title: "자격증 스터디 그룹", place: "할리스커피 신논현역점", desc: "넓은 테이블에서 각자 이어폰 꽂고 3시간 공부", time: "19:00", members: "4", current: 1, host: "합격기원", status: "upcoming", bg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" },
            { id: 's3', title: "도서관 오픈런 모닝 커피", place: "연세대학교 중앙도서관", desc: "아침 8시! 도서관에서 좋은 자리 맡고 빡공 완료.", time: "08:00", members: "3", current: 3, host: "얼리버드", status: "visited", bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" },
            { id: 's4', title: "그룹 프로젝트 회의", place: "스터디룸 위더스 홍대점", desc: "빔프로젝터 켜놓고 발표 자료 최종 점검 깔끔하게 끝!", time: "16:00", members: "5", current: 5, host: "팀장", status: "visited", bg: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&q=80" }
        ],
        'RANDOM': [
            { id: 'r1', title: "즉흥 야간 드라이브", place: "북악스카이웨이 팔각정", desc: "아무 생각 없이 바람 쐬러 쏘카 렌트 갈 사람.", time: "23:00", members: "2", current: 1, host: "조즉흥", status: "upcoming", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
            { id: 'r2', title: "홍대 버스킹 구경 투어", place: "홍대 걷고싶은거리", desc: "저녁 먹고 소화시킬 겸 길거리 공연 구경해요!", time: "20:00", members: "4", current: 2, host: "노는게제일좋아", status: "upcoming", bg: "https://images.unsplash.com/photo-1470229722913-7c092c41031c?w=600&q=80" },
            { id: 'r3', title: "익선동 한옥거리 먹방", place: "익선동 한옥거리 일대", desc: "웨이팅 없는 곳 아무데나 들어가서 디저트 뿌시기", time: "15:00", members: "3", current: 1, host: "디저트홀릭", status: "upcoming", bg: "https://images.unsplash.com/photo-1556910103-1c02745a8286?w=600&q=80" },
            { id: 'r4', title: "급 육회에 막걸리", place: "광장시장 육회자매집", desc: "비 와서 급 땡겨서 먹방 제대로 찍고 옴.", time: "18:00", members: "4", current: 4, host: "먹보", status: "visited", bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" }
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
            
            // 모임 아이템 클릭 이벤트 (티켓 보기 - 멤버 코드 인증 필수)
            card.addEventListener('click', () => {
                const codeInput = document.getElementById('member-code-input');
                if(!codeInput || codeInput.value !== '0314') {
                    alert('기존 멤버 전용 기능입니다.\n올바른 멤버 코드 4자리를 최상단 칸에 입력해주세요! (정답: 0314)');
                    if(codeInput) codeInput.focus();
                    return;
                }
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
