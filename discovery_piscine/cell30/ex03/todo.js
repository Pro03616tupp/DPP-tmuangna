const list = document.getElementById("ft_list");
const newButton = document.getElementById("new-todo");
const cookieName = "ft_todos";

function saveTodos() {
    const todos = Array.from(list.children, function (todo) { // อ่านข้อความจาก div แล้วบันทึกเป็น cookie ตรงนี้
        return todo.textContent;
    });

    document.cookie =
        cookieName + "=" + encodeURIComponent(JSON.stringify(todos)) +
        "; Max-Age=31536000; Path=/; SameSite=Lax";
}

// สร้าง div ของรายการใหม่
function addTodo(text) {
    const todo = document.createElement("div");
    todo.className = "todo";
    todo.textContent = text;

    // เมื่อคลิกรายการ ให้ถามก่อนลบ
    todo.addEventListener("click", function () {
        if (confirm("Delete this TO DO?\n" + text)) {
            todo.remove(); // ลบออกจาก DOM จริง
            saveTodos();   // บันทึกที่เหลือไว้ด้วย
        }
    });

    list.prepend(todo); // เอาอันใหม่ไว้บนสุด
}

// โหลดรายการที่เคยบันทึกไว้ใน cookie
function loadTodos() {
    const cookie = document.cookie
        .split(";")
        .map(function (part) {
            return part.trim();
        })
        .find(function (part) {
            return part.startsWith(cookieName + "=");
        });

    if (!cookie) {
        return; // ไม่มี cookie: ให้รายการยังว่าง
    }

    try {
        const saved = cookie.slice((cookieName + "=").length);
        const todos = JSON.parse(decodeURIComponent(saved));

        if (!Array.isArray(todos)) {
            return;
        }

        
        for (let i = todos.length - 1; i >= 0; i--) { // โหลดจากตัวล่างขึ้นบนจะไดเเหมือนก่อนปิดเว็บ
            if (typeof todos[i] === "string") {
                addTodo(todos[i]);
            }
        }
    } catch (error) {
        console.error("Cannot load saved TO DO list:", error);
    }
}

newButton.addEventListener("click", function () {
    const answer = prompt("Enter a new TO DO:");

    if (answer === null) {
        return; // กด Cancel
    }

    const text = answer.trim();

    if (text === "") {
        return; // เอาให้เพิ่มรายการว่างไม่ได้
    }

    addTodo(text);
    saveTodos();
});

loadTodos(); // โหลดหน้าเว็บเดิมเมื่อเปิด