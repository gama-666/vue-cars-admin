<template>
  <div>
    <div class="filter-from">
        <el-row>
            <el-col :span="18">
                <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px" label-position="centen">
                    <el-form-item label="车辆品牌：">
                    <el-select v-model="form.type" placeholder="选择品牌">
                        <el-option label="福特" value="1"></el-option>
                        <el-option label="奔驰" value="2"></el-option>
                        <el-option label="红旗" value="3"></el-option>
                        <el-option label="宝马" value="4"></el-option>
                        <el-option label="五菱" value="5"></el-option>
                    </el-select>
                    <el-form-item label="品牌型号：">
                    <el-input v-model="form.parking_name" placeholder="型号"></el-input>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="danger" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6">
                <div class="text-right">
                        <el-button type="primary"  @click="dialogVisble = true">新增车辆品牌</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="name" label="LOGO"></el-table-column>
        <el-table-column prop="type" label="车辆品牌"></el-table-column>
        <el-table-column prop="area" label="品牌型号"></el-table-column>
        <el-table-column prop="disabled" label="禁启用">
          <template slot-scope="scope">
              <el-switch v-model="scope.row.disabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template>
            <el-button type="danger" size="mini">编辑</el-button>
            <el-button type="warning" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- dialog 弹窗 -->
    <template>
        <el-dialog title="新增车辆品牌" :visible.sync="dialogVisble">
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
  </div>
</template>
<script>
export default {
  name: "CarsBrandIndex",
  data() {
    return {
      //弹窗标记
      dialogVisble:false,
      formLabelWidth: '120px',
      //表单数据
      form: {
          parking_name:"",
          name: "",
          type: "",
          area: "",
          carsNumber:"",
          disabled: "1",
          address: "32155,565654",
          operate: ""
      },
      //表格数据
      tableData: [
        {
          name: "包河区停车场",
          type: "室内",
          area: "合肥市包河区万岗路",
          carsNumber: 20,
          disabled: true,
          address: "32155,565654",
          operate: ""
        }
      ],
    };
  },
  methods: {
    onSubmit() {
      this.dialogVisble = false
      console.log("submit!");
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-right{
    text-align: right;
}
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