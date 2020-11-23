<template> 
    <el-dialog :title="data.parkingName" :visible.sync="dialogVisble" @close="close" @opened="opened" :close-on-click-modal="false" >
      <el-form ref="form" :model="data" label-width="100px">
          <div class="address-map">
          <Map  ref="amap" />
        </div>
        <el-button type="primary" @click="onSubmit" class="on-submit">确定</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
</template>
<script>
//地图 组件
import Map from "@/componeents/amap";
import { watch } from "@vue/composition-api";
export default {
  name: "ShowMap",
  components: { Map },
  props: {
    //弹窗显示隐藏开关
    flagVisble: {
      type: Boolean,
      default: false,
    },
    //地图数据
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogVisble: false,
    };
  },
  methods: {
    //关闭
    close() {
      this.$emit("update:flagVisble", false);
      this.$refs.amap.mapDestroy()
    },
    //确定
    onSubmit() {
      this.$emit("update:flagVisble", false);
    },
    opened() {
      this.$refs.amap.mapCreate()
      //调DOM元素的方法时，要确保元素已被加载完成
      this.$nextTick(() => {
        //DOM元素渲染完成后执行
        const arr = this.data.lnglat.split(",");
        const lnglat = {
          lng: arr[0],
          lat: arr[1],
        };
        this.$refs.amap.setMarker(lnglat);
      });
    },
  },
  //监听弹窗显示隐藏开关
  watch: {
    flagVisble: {
      handler(newVlaue, oldVlaue) {
        this.dialogVisble = newVlaue;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.address-map {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.on-submit {
  margin-top: 20px;
}
</style>