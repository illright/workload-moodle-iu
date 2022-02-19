<script lang="ts">
  export let id: number;

  const moodleAssignmentURL = '/mod/assign/view.php';
</script>

<a
  class="underline text-orange-500 leading-5"
  href="{moodleAssignmentURL}?id={id}"
>
  <slot />
</a>
