<template>
  <v-alert error dismissible @input="onClose" :value="error" >
      {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  computed: {
    error () {
      return this.$store.getters.error
    }

  },
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
