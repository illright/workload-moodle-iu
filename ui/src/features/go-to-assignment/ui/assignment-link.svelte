<script lang="ts">
  export let id: number;

  const moodleAssignmentURL = '/mod/assign/view.php';
</script>

<a href="{moodleAssignmentURL}?id={id}">
  <slot />
</a>

<style>
  a {
    color: #f97316;
    line-height: 1.25rem;
  }
</style>
