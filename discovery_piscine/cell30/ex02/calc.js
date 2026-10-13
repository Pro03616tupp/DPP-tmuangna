const calculator = document.getElementById("calculator");
const leftInput = document.getElementById("left");
const operatorInput = document.getElementById("operator");
const rightInput = document.getElementById("right");

calculator.addEventListener("submit", function (event) { // มันจะทำงานเมื่อกดปุ่ม Try me!
    event.preventDefault(); // ไม่ให้รีโหลดหน้าเว็บ 

    const leftText = leftInput.value.trim(); // อ่านข้อความจากช่องกรอก และตัดช่องว่างหัวท้าย
    const rightText = rightInput.value.trim();
 
    if (!/^\d+$/.test(leftText) || !/^\d+$/.test(rightText)) { // ได้แค่ตัวเลข 0–9 อย่างน้อย 1 ตัว ยังไม่รับค่าว่าง จำนวนลบ และทศนิยม
        alert("Error :(");
        return; // หยุด ไม่เอาไปคำนวณต่อ
    }

    const left = Number(leftText); // เปลี่ยนข้อความเป็นตัวเลข
    const right = Number(rightText);

    if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) { // ตรวจว่าตัวเลขยังอยู่ในช่วงที่ใช้งานได้ 
        alert("Error :(");
        return;
    }

    const operator = operatorInput.value;

    if ((operator === "/" || operator === "%") && right === 0) { // ห้ามหารหรือหาเศษด้วยศูนย์
        alert("It's over 9000!");
        return; 
    }

    let result;

    switch (operator) { // เลือกวิธีคำนวณตรงนี้
        case "+":
            result = left + right;
            break;
        case "-":
            result = left - right;
            break;
        case "*":
            result = left * right;
            break;
        case "/":
            result = left / right;
            break;
        case "%":
            result = left % right;
            break;
    }

    console.log(result); // ให้มันแสดงผลในคอนโซล
    alert(result);       // แสดงผลเป็นหน้าต่างแจ้งเตือน
});


setInterval(function () { 
    alert("Please, use me..."); // ทุก 30 วินาที ให้แสดงข้อความเตือน
}, 30000);