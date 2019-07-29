<template>
  <div class="qr-container">
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <img
      src="../assets/QR.svg"
      style="position: absolute; top:25%; bottom:25%; height: 50vh; width: 50vw;"
    />
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import router from "@/router";
export default {
  components: { QrcodeStream },

  data() {
    return {
      result: "",
      error: ""
    };
  },

  methods: {
    onDecode(result) {
      console.log(window.location.href, result);
      router.push({ path: "/", query: { queueId: result } });
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
        console.error(this.error);
      }
    }
  }
};
</script>

<style lang="scss">
.qr-container {
  background: #333;
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    .inside {
      video {
        margin: auto auto;
        height: 100%;
        max-width: 100vw;
      }
      height: 100vh;
    }
  }
}
</style>
