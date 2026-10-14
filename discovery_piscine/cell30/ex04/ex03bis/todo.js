$(function () {
  const $list = $("#ft_list");
  const cookieName = "jquery_todos";

  function readTasks() {
    const entry = document.cookie.split("; ").find(function (part) {
      return part.startsWith(cookieName + "=");
    });

    if (!entry) return [];

    try {
      const tasks = JSON.parse(decodeURIComponent(entry.slice(cookieName.length + 1)));
      return Array.isArray(tasks) ? tasks.filter(function (task) {
        return typeof task === "string";
      }) : [];
    } catch {
      return [];
    }
  }

  function saveTasks() {
    const tasks = $list.children(".todo").map(function () {
      return $(this).text();
    }).get();

    document.cookie = cookieName + "=" + encodeURIComponent(JSON.stringify(tasks))
      + "; Max-Age=31536000; Path=/; SameSite=Lax";
  }

  function addTask(text) {
    $("<div>").addClass("todo").text(text).prependTo($list);
  }

  readTasks().reverse().forEach(addTask);

  $("#new-task").on("click", function () {
    const answer = prompt("New TO DO:");
    if (answer === null || answer.trim() === "") return;

    addTask(answer.trim());
    saveTasks();
  });

  $list.on("click", ".todo", function () {
    if (!confirm("Remove this TO DO?")) return;

    $(this).remove();
    saveTasks();
  });
});
