<template>
  <div class="my-scan">
    <div class="scan-btn">
      <span v-if="!showScan" @click="onClick(true)">打开</span>
      <span v-else @click="onClick(false)">关闭</span>
    </div>
    <scanView
      ref="scan"
      v-if="showScan"
      @confirm="onScanConform"
      @close="onScanClose"
    />
  </div>
</template>

<script>
import scanView from "@/components/scanView.vue";
export default {
  name: "myTest",
  components: { scanView },
  data() {
    return {
      showScan: false,
    };
  },
  methods: {
    onClick(boo) {
      this.showScan = boo;
      this.$nextTick(() => {
        this.$refs.scan.onOpen();
      });
    },
    onScanConform(data) {
      if (!data) return;
      alert("扫描成功==>" + data);
      setTimeout(() => {
        this.onScanClose();
      }, 100);
    },
    onScanClose() {
      this.$refs.scan && this.$refs.scan.onClose();
      this.showScan = false;
    },
  },
};
</script>

<style lang="less">
.my-scan {
  height: 100%;
  .scan-btn {
    width: 100%;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 9999;
    color: blue;
  }
}
</style>
