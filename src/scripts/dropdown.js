import $ from "jquery";

const $document = $(document);

$(".js-dropdown__toggle").on("click", (e) => {
  e.stopPropagation();
  const $target = $(e.target);
  const $dropdown = $target.closest(".js-dropdown");

  if (!$dropdown.hasClass("js-is-shown")) {
    $document.on("click.dropdown", (e) => {
      $dropdown.removeClass("js-is-shown");
      $document.off("click.dropdown");
    });
  } else {
    $document.off("click.dropdown");
  }

  $dropdown.toggleClass("js-is-shown");
});
