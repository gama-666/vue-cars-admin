<template> 
    <el-dialog title="新增车辆品牌" :visible.sync="dialogVisble" @close="close" :close-on-click-modal="false">
          <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="车辆品牌">
          <el-col :span="10">
                <el-input v-model="form.name"></el-input>
          </el-col>
      </el-form-item>
      <el-form-item label="LOGO">
          <div class="upload-img-wrap">
              <div class="upload-img">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt="">
              </div>
              <ul class="img-list">
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
                <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605612856480&di=e8cb600d3f6a473b851a7d18d55f2f59&imgtype=0&src=http%3A%2F%2Fimg1.cheshi-img.com%2Fcenter%2F600%2F56%2Fbb%2Fa6%2F0d1ef33083544a8b49a1c2f6f1.jpeg" alt=""></li>
              </ul>
          </div>
      </el-form-item>
      <el-form-item label="车辆型号">
          <el-col :span="10">
                <el-input v-model="form.carsNumber"></el-input>
          </el-col>
      </el-form-item>
      <el-form-item label="禁启用" prop="resource">
        <el-radio-group v-model="form.disabled">
          <el-radio label="1">启用</el-radio>
          <el-radio label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述">
        <div class="address-map"></div>
      </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
</template>
<script>
import { watch } from '@vue/composition-api';
export default {
  name: "AddCarsBrand",
  props:{
    //弹窗显示隐藏开关
    flagVisble:{
      type:Boolean,
      default:false
    },
    //表单数据
    form:{
      type:Object,
      default:{}
    }
  },
  data(){
    return{
      dialogVisble:false,
    }
  },
  methods:{
    close(){
      this.$emit("update:flagVisble",false)
    },
    onSubmit() {
      this.$emit("update:flagVisble",false)
    },
  },
  //监听弹窗显示隐藏开关
  watch:{
    flagVisble:{
      handler(newVlaue,oldVlaue){
        this.dialogVisble = newVlaue
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-img-wrap{
    display: flex;
   .upload-img{
       position: relative;
       width: 148px;
       height: 148px;
       cursor: pointer;
       line-height: 146px;
       border: 1px dashed #c0ccda;
       background-color: #fbfdff;
       border-radius: 6px;
       box-sizing: border-box;
       text-align: center;
       vertical-align: top;
        &:before{
            content: "+";
            font-size: 40px;
            color: #dedede;
            font-weight: 200;
        }
        img{
            position: absolute;
            left: 0px;
            top: 0px;
            width:100%;
            height:100%;
        }
   }
   .img-list{
       flex: 1;
       padding-left: 30px;
       li{
           float: left;
           width: 60px;
           height: 60px;
           margin: 0 10px;
           img{
            width:100%;
            height:100%;
           }
       }
   }
}
.address-map{
  width: 500px;
  height: 100px;
  background-color: #f5f5f5;
  border:1px solid #dedede;
}
</style>