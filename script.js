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
            // 11 items
            { id: 'e1', title: "스트라이크 치고 피자 파티", place: "스매싱볼 강남점", desc: "시원하게 볼링 치고 피맥 쏘기!", time: "19:00", members: "4", current: 2, host: "박지성", status: "upcoming", bg: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&q=80" },
            { id: 'e2', title: "나이키 러닝크루 합류", place: "여의도 한강공원 광장", desc: "다 같이 호흡 맞추며 5km 러닝 인증샷!", time: "20:00", members: "5", current: 3, host: "런닝러", status: "upcoming", bg: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80" },
            { id: 'e3', title: "실내 클라이밍 첫 도전", place: "클라이머스 강남", desc: "초보도 가능한 볼더링 배우고 뿌링클 고", time: "14:00", members: "4", current: 2, host: "오운완", status: "upcoming", bg: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80" },
            { id: 'e4', title: "하이커 그라운드 체험", place: "하이커 그라운드", desc: "케이팝 커버댄스 치고 숏폼 찍어볼 사람 구함", time: "15:00", members: "4", current: 1, host: "댄스가수", status: "upcoming", bg: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80" },
            { id: 'e5', title: "노들섬 야외 페스티벌", place: "노들섬 잔디마당", desc: "잔디밭에서 공연도 보고 노을 구경해요!", time: "17:30", members: "5", current: 3, host: "낭만맨", status: "upcoming", bg: "https://images.unsplash.com/photo-1533174000255-af29eb4277fa?w=600&q=80" },
            { id: 'e6', title: "테마파크 오픈런", place: "에버랜드", desc: "눈치게임 성공 기원! 티익스프레스 3번 타기", time: "09:00", members: "6", current: 2, host: "놀이기구매니아", status: "upcoming", bg: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80" },
            { id: 'e7', title: "동전노래방 메들리", place: "더코노 동전노래연습장 홍대점", desc: "신나게 목 쉬도록 노래 부를 분 모여주세요", time: "18:00", members: "3", current: 2, host: "가왕", status: "upcoming", bg: "https://images.unsplash.com/photo-1516280440502-6294709212ad?w=600&q=80" },
            { id: 'e8', title: "프로야구 직관 홈런파티", place: "잠실종합운동장 야구장", desc: "응원석 예매 완료! 치맥하면서 미친듯이 응원해요", time: "18:30", members: "4", current: 4, host: "야구왕", status: "visited", bg: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600&q=80" },
            { id: 'e9', title: "올림픽공원 따릉이 라이딩", place: "올림픽공원 들꽃마루", desc: "인생샷 찍고 따릉이 타고 바람 쐬기", time: "13:00", members: "4", current: 4, host: "따릉러", status: "visited", bg: "https://images.unsplash.com/photo-1471018236639-247396ad74ab?w=600&q=80" },
            { id: 'e10', title: "방탈출 1시간 컷 도전", place: "룸즈에이 홍대점", desc: "힌트 없이 빠르게 머리 써서 탈출 성공함!", time: "16:00", members: "4", current: 4, host: "코난", status: "visited", bg: "https://images.unsplash.com/photo-1574681608674-d4baedde66f9?w=600&q=80" },
            { id: 'e11', title: "롯데월드 전세내기", place: "롯데월드 어드벤처", desc: "교복 빌려 입고 후렌치레볼루션 3번 타기", time: "10:00", members: "6", current: 6, host: "모험가", status: "visited", bg: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80" }
        ],
        'I': [
            // 11 items
            { id: 'i1', title: "서촌 브런치와 독서 모임", place: "어스핸드위치 서촌점", desc: "각자 좋아하는 책 가져가서 조용히 브런치 냠냠.", time: "11:00", members: "3", current: 1, host: "최수진", status: "upcoming", bg: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80" },
            { id: 'i2', title: "독립서점 탐방", place: "최인아책방 역삼점", desc: "조용히 책 고르고 각자 커피 마시며 쉬는 시간.", time: "15:00", members: "4", current: 2, host: "책벌레", status: "upcoming", bg: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80" },
            { id: 'i3', title: "라이브 재즈와 와인", place: "연남5701", desc: "대화 없이 그저 음악 감상하며 레드와인 한 잔.", time: "20:00", members: "2", current: 1, host: "이무드", status: "upcoming", bg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" },
            { id: 'i4', title: "여유로운 숲 속 피크닉", place: "서울숲 잔디광장", desc: "돗자리 펴고 누워서 아무것도 안 하기", time: "14:00", members: "3", current: 2, host: "나무성애자", status: "upcoming", bg: "https://images.unsplash.com/photo-1469032607996-df6b801aabc2?w=600&q=80" },
            { id: 'i5', title: "디카페인 커피 한 잔", place: "청수당 종로", desc: "동양적 정원 분위기에서 물소리 들으며 휴식", time: "16:00", members: "2", current: 1, host: "종로구민", status: "upcoming", bg: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80" },
            { id: 'i6', title: "잔잔한 현대미술 관람", place: "송은미술관", desc: "사전예약 완료, 조용히 관람하고 헤어져요", time: "11:00", members: "4", current: 1, host: "아트홀릭", status: "upcoming", bg: "https://images.unsplash.com/photo-1518998053401-878c735c05bc?w=600&q=80" },
            { id: 'i7', title: "고요한 밤 성곽길 산책", place: "낙산공원 성곽길", desc: "야경 보며 조용히 산책하고 생각 정리", time: "22:00", members: "2", current: 1, host: "밤부엉이", status: "upcoming", bg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80" },
            { id: 'i8', title: "도자기 공방 원데이", place: "오브제룸 안국", desc: "흙 만지며 잡념 없애기, 물레 체험 힐링 완료", time: "13:00", members: "3", current: 3, host: "손재주", status: "visited", bg: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80" },
            { id: 'i9', title: "요시고 사진전 감상", place: "그라운드시소 서촌", desc: "사진전 조용히 보고 근처에서 차 마시고 헤어졌어요.", time: "14:00", members: "2", current: 2, host: "사진광", status: "visited", bg: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80" },
            { id: 'i10', title: "음악감상 LP바", place: "제비다방", desc: "음악 선곡이 너무 좋아서 맥주 한 잔이 술술 넘어감", time: "19:00", members: "2", current: 2, host: "리스너", status: "visited", bg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80" },
            { id: 'i11', title: "고궁 명상 걷기", place: "경복궁 향원정", desc: "사람 적을 시간에 가서 조용히 한옥 감상", time: "10:00", members: "3", current: 3, host: "한옥러버", status: "visited", bg: "https://images.unsplash.com/photo-1582239455353-81baf1d821ae?w=600&q=80" }
        ],
        'STUDY': [
            // 11 items
            { id: 's1', title: "밤샘 코딩 모임", place: "작심스터디카페 신촌점", desc: "각자 할거 가져와서 새벽 2시까지 빡공.", time: "22:00", members: "4", current: 2, host: "김열공", status: "upcoming", bg: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
            { id: 's2', title: "자격증 스터디 그룹", place: "할리스커피 신논현역점", desc: "넓은 테이블에서 각자 이어폰 꽂고 3시간 공부", time: "19:00", members: "4", current: 1, host: "합격기원", status: "upcoming", bg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" },
            { id: 's3', title: "집중 코워킹 스페이스", place: "스파크플러스 역삼점", desc: "스타트업 분위기 속에서 각자 작업 집중!", time: "13:00", members: "4", current: 2, host: "개발자", status: "upcoming", bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
            { id: 's4', title: "스터디카페 오픈런", place: "랭스터디카페 성수점", desc: "조용하고 집중 잘 되는 분위기, 같이 가요", time: "09:00", members: "3", current: 1, host: "아침형인간", status: "upcoming", bg: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=600&q=80" },
            { id: 's5', title: "외국어 회화 스터디", place: "컬처랩라운지 강남", desc: "가볍게 영어로만 대화하며 말하기 연습", time: "18:00", members: "6", current: 3, host: "글로벌", status: "upcoming", bg: "https://images.unsplash.com/photo-1533227260842-fd83cf4cece1?w=600&q=80" },
            { id: 's6', title: "책과 빵이 있는 독서", place: "카페꼼마 합정점", desc: "향긋한 커피랑 빵 먹으며 3시간 목표 독서", time: "14:00", members: "4", current: 2, host: "빵순이", status: "upcoming", bg: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80" },
            { id: 's7', title: "철야 작업용 대형카페", place: "이디야커피랩 논현동", desc: "다 같이 노트북 들고 가서 끝날 때까지 안 돌아옴", time: "00:00", members: "4", current: 1, host: "올빼미", status: "upcoming", bg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" },
            { id: 's8', title: "도서관 오픈런 모닝 커피", place: "연세대학교 중앙도서관", desc: "아침 8시! 도서관에서 좋은 자리 맡고 빡공 완료.", time: "08:00", members: "3", current: 3, host: "얼리버드", status: "visited", bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" },
            { id: 's9', title: "그룹 프로젝트 회의", place: "스터디룸 위더스 홍대점", desc: "빔프로젝터 켜놓고 발표 자료 최종 점검 깔끔하게 끝!", time: "16:00", members: "5", current: 5, host: "팀장", status: "visited", bg: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&q=80" },
            { id: 's10', title: "기말고사 초집중", place: "서울대학교 관정관", desc: "역시 도서관이 최고, 하루 종일 열공함", time: "09:00", members: "4", current: 4, host: "학점사냥꾼", status: "visited", bg: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80" },
            { id: 's11', title: "논문 자료 수집", place: "국립중앙도서관", desc: "조용히 필요한 자료만 쏙쏙 뽑아서 정리하고 컴백", time: "10:00", members: "2", current: 2, host: "대학원생", status: "visited", bg: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80" }
        ],
        'RANDOM': [
            // 11 items
            { id: 'r1', title: "즉흥 야간 드라이브", place: "북악스카이웨이 팔각정", desc: "아무 생각 없이 바람 쐬러 쏘카 렌트 갈 사람.", time: "23:00", members: "2", current: 1, host: "조즉흥", status: "upcoming", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
            { id: 'r2', title: "홍대 버스킹 구경 투어", place: "홍대 걷고싶은거리", desc: "저녁 먹고 소화시킬 겸 길거리 공연 구경해요!", time: "20:00", members: "4", current: 2, host: "노는게제일좋아", status: "upcoming", bg: "https://images.unsplash.com/photo-1470229722913-7c092c41031c?w=600&q=80" },
            { id: 'r3', title: "익선동 한옥거리 먹방", place: "익선동 한옥거리 일대", desc: "웨이팅 없는 곳 아무데나 들어가서 디저트 뿌시기", time: "15:00", members: "3", current: 1, host: "디저트홀릭", status: "upcoming", bg: "https://images.unsplash.com/photo-1556910103-1c02745a8286?w=600&q=80" },
            { id: 'r4', title: "무지개 분수 멍때리기", place: "반포대교 달빛무지개분수", desc: "돗자리 없이 그냥 벤치 앉아서 물멍", time: "20:30", members: "4", current: 2, host: "물멍러", status: "upcoming", bg: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34fc?w=600&q=80" },
            { id: 'r5', title: "길거리 음식 탐방", place: "망원시장", desc: "고로케랑 칼국수 일단 먹고 시작할 분", time: "12:00", members: "3", current: 1, host: "푸드파이터", status: "upcoming", bg: "https://images.unsplash.com/photo-1549484838-89c5fcc3ebbf?w=600&q=80" },
            { id: 'r6', title: "뷰 맛집 카페 투어", place: "이태원 해방촌 신흥시장", desc: "가파른 언덕이지만 야경뷰 하나 믿고 감!", time: "18:00", members: "3", current: 2, host: "인스타그래머", status: "upcoming", bg: "https://images.unsplash.com/photo-1515250499645-a7db2e0bc2ea?w=600&q=80" },
            { id: 'r7', title: "급 야식 치킨 배달", place: "뚝섬 한강공원 배달존", desc: "갑자기 치킨 땡겨서 한강에서 급 번개 모임", time: "21:00", members: "4", current: 1, host: "치느님", status: "upcoming", bg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
            { id: 'r8', title: "관광객 모드 돌입", place: "남산 서울타워 케이블카", desc: "서울 살면서 남산 안 가본 사람? 케이블카 타고 돈까스", time: "13:00", members: "4", current: 4, host: "관광객", status: "visited", bg: "https://images.unsplash.com/photo-1538600109919-4b3f81e3a3da?w=600&q=80" },
            { id: 'r9', title: "급 육회에 막걸리", place: "광장시장 육회자매집", desc: "비 와서 급 땡겨서 먹방 제대로 찍고 옴.", time: "18:00", members: "4", current: 4, host: "먹보", status: "visited", bg: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" },
            { id: 'r10', title: "해산물과 소주 한 잔", place: "서촌 계단집", desc: "해물라면에 소주 조합 미쳤음! 웨이팅 성공", time: "19:00", members: "4", current: 4, host: "알콜러버", status: "visited", bg: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80" },
            { id: 'r11', title: "동대문 야간 산책", place: "DDP 디자인랩", desc: "현대적인 건축물 보며 사이버펑크 갬성 샷 찍음", time: "22:00", members: "3", current: 3, host: "힙스터", status: "visited", bg: "https://images.unsplash.com/photo-1520113412646-fae57b56f8f5?w=600&q=80" }
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
                    alert('기존 멤버 전용 기능입니다.\n올바른 멤버 코드 4자리를 최상단 칸에 입력해주세요!');
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

    showCreateBtn.addEventListener('click', () => {
        const inputCode = prompt("새 모임을 열려면 기존 멤버 코드를 입력해주세요 (4자리)");
        if(inputCode === '0314') {
            createModal.classList.add('active');
        } else if(inputCode !== null) {
            alert("기존 멤버 코드가 올바르지 않습니다.");
        }
    });
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
