import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgg8ej78V6fWOnPmWHrJ5G9HXp0gMQgJw",
  authDomain: "honja-ticket.firebaseapp.com",
  projectId: "honja-ticket",
  storageBucket: "honja-ticket.firebasestorage.app",
  messagingSenderId: "196009153919",
  appId: "1:196009153919:web:97f7187b5998793290364a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Login Logic
const loginBtn = document.getElementById('login-btn');
const adminPw = document.getElementById('admin-pw');
const loginError = document.getElementById('login-error');

loginBtn.addEventListener('click', attemptLogin);
adminPw.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') attemptLogin();
});

function attemptLogin() {
    if (adminPw.value === 'honja0314' || adminPw.value === '0314') {
        document.getElementById('login-container').classList.remove('active');
        document.getElementById('dashboard-container').classList.add('active');
        loadData();
    } else {
        loginError.style.display = 'block';
    }
}

function loadData() {
    const tbody = document.getElementById('table-body');
    const totalCount = document.getElementById('total-count');

    // Realtime connection to firestore applications
    onSnapshot(collection(db, "applications"), (snapshot) => {
        tbody.innerHTML = '';
        totalCount.textContent = snapshot.size;

        if(snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; color: #9ca3af; padding: 2rem;">최근 생성된 지원서가 없습니다. 파이어베이스가 정상 연결되었습니다.</td></tr>';
            return;
        }

        const apps = [];
        snapshot.forEach((doc) => {
            apps.push({ id: doc.id, ...doc.data() });
        });

        // Time descending sort
        apps.sort((a, b) => {
            const timeA = a.createdAt ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt ? b.createdAt.toMillis() : 0;
            return timeB - timeA; // 최신순
        });

        apps.forEach(app => {
            const tr = document.createElement('tr');
            
            let dateStr = '-';
            if (app.createdAt) {
                const d = app.createdAt.toDate();
                const m = (d.getMonth() + 1).toString().padStart(2, '0');
                const day = d.getDate().toString().padStart(2, '0');
                const ht = d.getHours().toString().padStart(2, '0');
                const min = d.getMinutes().toString().padStart(2, '0');
                dateStr = `${d.getFullYear().toString().slice(-2)}/${m}/${day} ${ht}:${min}`;
            }

            const acts = (app.activities && app.activities.length > 0) ? app.activities.join(', ') : '-';
            
            tr.innerHTML = `
                <td><strong>${app.name || '-'}</strong></td>
                <td>${app.age || '-'}</td>
                <td>${app.school || '-'}</td>
                <td>${app.station || '-'}</td>
                <td><span class="mbti-badge">${app.mbti || '-'}</span></td>
                <td>${app.contact || '-'}</td>
                <td><div style="font-size: 0.85rem; max-width: 230px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${acts}">${acts}</div></td>
                <td style="color: #6b7280; font-size: 0.85rem;">${dateStr}</td>
                <td><button class="delete-btn" data-id="${app.id}">삭제</button></td>
            `;

            tbody.appendChild(tr);
        });

        // Button handlers
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if(confirm('정말 이 지원서를 삭제하시겠습니까? (영구 삭제)')) {
                    try {
                        await deleteDoc(doc(db, "applications", id));
                    } catch(err) {
                        console.error(err);
                        alert('Firestore 권한 문제 또는 결제 계정이 활성화되지 않았습니다. 콘솔을 확인하세요.');
                    }
                }
            });
        });
    }, (error) => {
        console.error("Firestore listener error:", error);
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; color: #ef4444; padding: 2rem;">[오류] 구글 클라우드 결제 또는 권한이 구성되지 않았습니다.<br>파이어베이스 콘솔의 설정을 확인해주세요.</td></tr>';
    });
}
