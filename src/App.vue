<template>
    <div class="main">
        <router-view
                keep-alive
                transition="fade"
                transition-mode='out-in'></router-view>
    </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>
