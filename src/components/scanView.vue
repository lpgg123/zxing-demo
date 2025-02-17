<template>
  <div class="scan">
    <!-- <div @click="onOpen">打开摄像头</div>
    <div @click="onClose">关闭摄像头</div> -->
    <div class="video-container" v-if="open">
      <!-- <van-icon class="scan-cancel" name="clear" @click="onClose" /> -->
      <div class="scan-box"></div>
      <video class="video" id="video-1"></video>
    </div>
  </div>
</template>

<script>
import {
  BrowserMultiFormatReader,
  ChecksumException,
  FormatException,
} from "@zxing/library";
export default {
  name: "scanView",
  data() {
    return {
      codeReader: new BrowserMultiFormatReader(),
      videoInputDevices: [],
      currentVideoInputDevice: {},
      decodeResult: undefined,
      open: false,
    };
  },
  methods: {
    onClose() {
      this.codeReader.reset(); //关闭摄像头
      this.$nextTick(() => {
        this.open = false;
        this.$emit("close");
      });
    },
    onOpen() {
      this.open = true;
      this.$nextTick(() => {
        this.openScan();
      });
    },
    async openScan() {
      const _this = this;
      _this.codeReader
        .getVideoInputDevices() //老版本listVideoInputDevices()
        .then(videoInputDevices => {
          console.log("videoInputDevices==>", videoInputDevices);

          if (videoInputDevices && videoInputDevices.length) {
            if (videoInputDevices.length > 1) {
              videoInputDevices.reverse();
            } //防止先唤出前摄像头
            _this.videoInputDevices = videoInputDevices;
            _this.currentVideoInputDevice = videoInputDevices[0];
          }
        })
        .catch(() => {});
    },

    decodeFromInputVideo() {
      const _this = this;
      _this.codeReader.reset();
      // 多次
      _this.codeReader.decodeFromVideoDevice(
        _this.currentVideoInputDevice.deviceId,
        "video-1",
        (result, err) => {
          if (result) {
            _this.decodeResult = result;
          }
          if (err) {
            if (err instanceof ChecksumException) {
              alert(1);
              console.log(
                "A code was found, but it's read value was not valid."
              );
            }
            if (err instanceof FormatException) {
              alert(2);
              console.log("A code was found, but it was in a invalid format.");
            }
          }
        }
      );
    },

    successDecode() {
      const _this = this;
      console.log(_this.decodeResult.text);
      _this.$emit("confirm", _this.decodeResult.text);
      // alert(_this.decodeResult.text);
    },
  },
  watch: {
    currentVideoInputDevice: function () {
      this.decodeFromInputVideo();
    },
    decodeResult: function () {
      this.successDecode();
    },
  },
  mounted() {
    // this.openScan();
  },
  unmounted: function () {
    this.codeReader.reset(); //关闭摄像头
  },
};
</script>
<style scoped lang="less">
.scan {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
  color: #fff;
  .video-container {
    position: relative;
    height: 100%;
    .scan-cancel {
      position: fixed;
      top: 10px;
      left: 10px;
      font-size: 26px;
      z-index: 999;
    }

    .scan-box {
      position: absolute;
      top: 0;
      left: 16%;
      width: 70%;
      height: 2px;
      box-sizing: border-box;
      background: linear-gradient(
        to left,
        #0074d9 0%,
        #0074d9 20%,
        transparent 40%,
        transparent 60%,
        #0074d9 80%,
        #0074d9 100%
      );
      animation: scanBoxAnimation 4s infinite;
    }
    .video {
      width: 100vw;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
    }
  }
}

@keyframes scanBoxAnimation {
  0% {
    transform: translateY(15vh);
  }
  50% {
    transform: translateY(80vh);
  }
  100% {
    transform: translateY(15vh);
  }
}
</style>
