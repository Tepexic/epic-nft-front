<template>
  <b-button
    class="tw-bg-pink-800 hover:tw-bg-pink-700 hover:tw-scale-105 tw-w-full tw-text-xl md:tw-text-2xl tw-px-6 tw-py-4 tw-border-none tw-shadow"
    :class="classes"
    @click="$emit('click')"
  >
    {{ text }}
  </b-button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    classes: {
      required: false,
      type: String,
      default: () => "",
    },
    text: {
      required: false,
      type: String,
      default: () => "",
    },
  },
};
</script>
