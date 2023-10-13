<template>
  <div class="box">
    <div class="header" ref="header">
      <p>
        <span @click="home"><img src="../assets/logo.svg" alt=""></span>
        <span @click="home">{{ isEnglish ? 'AIWaves Agents' : 'AIWaves Agents' }}</span>
        <span @click="home">{{ isEnglish ? 'Home' : '首页' }}</span>
        <span>

          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ isEnglish ? "Agents" : "机器人" }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in Allbot" :key=index :command="item.desc.botname"
                @click="handleCommand(command)">{{ isEnglish ? item.desc.translate.botname : item.desc.botname
                }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <span class="new"><span>+</span> {{ isEnglish ? "Create" : "创建" }}</span>
        <span class="Toggle" @click="toggleLanguage"><i class="el-icon-sort" id="icon"></i>English/中文</span>
        <span class="min_Toggle" @click="toggleLanguage"><i class="el-icon-sort" id="icon"></i></span>
        <span class="min_meun" @click="drawer = true"><i class="el-icon-s-fold" id="icon"></i></span>
      </p>
    </div>
    <div class="main">
      <!-- <h3>{{ isEnglish ? 'Agents' : "代理" }}</h3>s -->
      <div class="main_one">
        <div ref="main_one_son" class="main_one_son" v-for="(item, index) in Allbot" :key="index" @click="chat(item)">
          <!-- <img class="back" src="../assets/进入.svg" alt=""> -->
          <img class="bgimg_two" src="../assets/进入.svg" alt="">
          <img class="bgimg" :src="`${baseURL}${item.desc.image}`" alt="">
          <div class="bg_father">
            <p class="bgimg_three">{{ isEnglish ? item.desc.translate.botname : item.desc.botname }}</p>
            <p class="bgimg_four">{{ isEnglish ? item.desc.translate.output : item.desc.output }}</p>
          </div>
          <!-- <p><img :src="img + item.desc.image" alt=""></p> -->
        </div>
      </div>
      <div class="main_two">

      </div>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div v-for="(item, index) in Allbot" :key="index" class="bot" @click="handleCommand(item)">
        {{ isEnglish ? item.desc.translate.botname : item.desc.botname }}
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axiso from "../utis/request"
import { setToken, getToken } from '@/utis/storage'
import "../element_two.css"
import "../index.scss"
export default {
  data () {
    var validateCompany = (rule, value, callback) => {
      if (!value) {
        callback(new Error('公司名称不能为空'));
      } else if (value.length > 30) {
        callback(new Error('公司名称不能超过30个字符'));
      } else {
        callback();
      }
    }
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不能为空'));
      } else if (value.length > 10) {
        callback(new Error('姓名不能超过10个字符'));
      } else {
        callback();
      }
    }
    var validateContact = (rule, value, callback) => {
      if (!value) {
        if (this.isEnglish) {
          callback(new Error('contact information cannot be empty'))
        } else {
          callback(new Error('联系方式不能为空'))
        }
      } else {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        let re = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!(reg.test(value) || re.test(value))) {
          if (this.isEnglish) {
            callback(new Error('please enter the correct cell phone number or email address'))
          } else {
            callback(new Error('请输入正确的手机号码或邮箱'))
          }
        }
        callback()
      }
    }
    return {
      isEnglish: true,
      Allbot: "",
      bot: "Agents",
      img: "https://",
      baseURL: '',
      dialogVisible: false,
      ruleForm: {
        company: '',
        name: '',
        position: '',
        contact: '',
        city: '',
      },
      rules: {
        company: [
          { validator: validateCompany, trigger: 'blur' }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        contact: [
          { validator: validateContact, trigger: 'blur' }
        ]
      },
      drawer: false
    }
  },
  methods: {
    change_dialogVisible () {
      if (localStorage.getItem("token")) {
      } else {
        this.dialogVisible = true
      }
    },
    setLanguage () {
      if (getToken('isEnglish') !== undefined) {
        if (getToken('isEnglish') === 'false') {
          this.isEnglish = false
        } else {
          this.isEnglish = true
        }
      }
    },
    toggleLanguage () {
      this.isEnglish = !this.isEnglish
      setToken('isEnglish', this.isEnglish)
    },
    handleCommand (command) {
      this.$router.push({
        path: "/botlist",
        query: { name: command }
      })
      this.bot = command
    },
    home () {
      this.$router.push("/")
    },
    chat (item) {
      console.log(item);
      this.$router.push({
        path: "/botlist",
        query: { name: item.desc.botname }
      })
    },
    handleScroll () {
      console.log(111);
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      // if (scrollTop > 0) {
      //   const header = this.$refs.header
      //   header.style.background = "#fff"
      //   header.style.color = "red"
      //   header.style.zIndex = '9999'
      // }
      if (scrollTop > 0) {
        const header = this.$refs.header
        // header.style.webkitBackdropFilter = 'blur(20px)';
        // header.style.backdropFilter = 'blur(20px)';
        // header.style.background = 'blue';
        /* 使用标准的 backdrop-filter 属性 */
        // header.style.webkit - backdropFilter= 'blur(20px)';
      } else {


      }

    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axiso({
            method: "POST",
            url: this.baseURL + "/index/regis_company",
            data: {
              company_name: this.ruleForm.company,
              username: this.ruleForm.name,
              position: this.ruleForm.position,
              city: this.ruleForm.city,
              contact: this.ruleForm.contact
            }
          }).then((res => {
            console.log(res);
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            localStorage.setItem("token", this.ruleForm.contact)
            console.log(this.ruleForm.contact);
            // this.$router.push("/about")
          }))

          this.dialogVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      // this.baseURL = 'http://192.168.110.200:18876'
      this.baseURL = 'http://aiwaves-agents.com:9099/agent-factory-api'
    } else {
      this.baseURL = 'http://aiwaves-agents.com:9099/agent-factory-api'
    }
    this.setLanguage()

    window.addEventListener("scroll", this.handleScroll);
    axiso({
      method: "get",
      url: this.baseURL + "/api/v1/bot/get_public_bots",
    }).then(res => {
      console.log(res.data.content);
      this.Allbot = res.data
      console.log(this.Allbot);
    })
  }
}
</script>

<style scoped lang="scss">
* {
  list-style: none;
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Times New Roman', Times, serif;

  .box {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;

    .header {
      width: 100%;
      height: 80px;
      z-index: 99999999;
      position: fixed;
      top: 0;
      box-shadow: 0px 2px 4px 0px rgba(150, 150, 150, 0.5);
      background-color: #fff;

      p {
        width: 80%;
        color: #000 !important;
        display: flex;
        align-items: center;
        margin-left: 15px;
        margin-top: 10px;

        .el-dropdown-link {
          color: #000 !important;
          margin-left: 15px !important;
        }

        span:nth-child(2) {
          font-size: 20px;
          margin-left: 10px;
          margin-right: 20px;
        }

        span:nth-child(3) {

          margin-left: 160px;
          margin-right: 120px;
        }

        .new {
          display: flex;
          align-items: center;
          justify-content: center;
          border: solid 1px #000;
          border-radius: 5px 5px;
          padding-left: 13px;
          padding-right: 21px;
          line-height: 20px;
          position: absolute;
          right: 323px;
          height: 36px;

          span {
            margin-bottom: 2px;
            margin-right: 15px;
            font-size: 30px;
            font-weight: 600;
          }
        }

        .Toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          border: solid 1px #000;
          border-radius: 5px 5px;
          padding: 0px 15px;
          line-height: 20px;
          position: absolute;
          right: 100px;
          height: 36px;
        }

        #icon {
          transform: rotate(90deg);
          margin-right: 7px;
        }

        .new:hover {
          cursor: pointer;
        }

        .Toggle:hover {
          cursor: pointer;
        }
      }
    }

    .main {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: calc(100% - 60px);
      text-align: center;
      color: #333333;

      @media screen and (max-width: 800px) {
        padding: 50px 0;
        height: auto;
        min-height: 100%;
      }

      h3 {
        font-size: 28px;
      }

      .main_one {
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 80%;
        // height: 100%;

        @media screen and (max-width: 800px) {
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: start;
        }

        /* 水平居中 */
        .main_one_son {
          display: flex;
          align-content: center;
          align-items: center;
          justify-content: center;
          width: 40%;
          background: #ccc;
          margin: 2%;
          border-radius: 15px 15px;
          min-height: 15vh;
          padding: 10vh 0px;
          position: relative;
          overflow: hidden;

          @media screen and (max-width: 800px) {
            padding: 0;
            width: 100%;
            min-height: 200px;
          }

          .bgimg {
            display: inline-block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            border-radius: 15px 15px;
            filter: blur(4px);
            transition: all 0.4s;
          }

          .bgimg_two {
            cursor: pointer;
            display: none;
            z-index: 999;
            position: relative;
            transition: all 1s;
            width: 0px;
            height: 0px;

            @media screen and (max-width: 800px) {
              display: block;
              width: 50px;
              height: 50px;
            }
          }

          .bg_father {
            position: absolute;
            z-index: 22;
            top: 40%;
            @media screen and (max-width: 800px) {
              top: 65%;
            }
          }

          .bgimg_three {
            margin-bottom: 15px;
            color: #FFFFFF;
            font-size: 46px;
            transition: all 1s;
            font-weight: 900;

            @media screen and (max-width: 1600px) {
              font-size: 36px;
            }

            @media screen and (max-width: 800px) {
              font-size: 18px;
              margin-bottom: 2px;
            }
          }

          .bgimg_four {
            color: #FFFFFF;
            font-size: 20px;
            transition: all 1s;

            @media screen and (max-width: 800px) {
              font-size: 14px;
            }
          }
        }

        .main_one_son:hover {
          .bgimg {
            filter: blur(0px);
            transition: all 0.4s;
          }

          .bgimg_two {
            display: block;
            width: 100px;
            height: 100px;
            transition: all 1s;

            @media screen and (max-width: 1600px) {
              width: 70px;
              height: 70px;
            }
          }

          .bg_father {
            top: 60%;
            transition: all 1s;
          }
        }

        // .main_one_son:hover {
        //   background-image: url("../assets/进入.svg");
        //   background-repeat: no-repeat;
        //   background-position: center 20%;

        // }
      }
    }
  }
}

::v-deep .el-dialog__wrapper {
  .el-dialog {
    min-width: 500px !important;
    background: #FFFFFF;
    border-radius: 8px;

    @media screen and (max-width: 600px) {
      width: 90% !important;
      min-width: 100px !important;
    }

    .el-dialog__header {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
    }

    .el-dialog__body {
      padding: 0;
    }

    .el-dialog__footer {
      padding: 18px 62px;

      @media screen and (max-width: 600px) {
        padding: 12px 19px;
      }

      .el-button {
        margin-top: 17px;
        width: 77px;
        height: 34px;
        border-radius: 4px;
        border: 1px solid #979797;
      }

      .el-form-item {
        @media screen and (max-width: 600px) {
          margin-bottom: 10px;
        }
      }

      .el-form-item__label {
        @media screen and (max-width: 600px) {
          padding: 0;
        }
      }

      .el-button {
        @media screen and (max-width: 600px) {
          margin: 10px 30px !important;
        }
      }
    }
  }
}

::v-deep .el-drawer__wrapper {
  .el-drawer {
    width: 232px !important;

    .bot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 44px;
      border-bottom: #F2F2F2 1px solid;
      font-size: 12px;
      color: #959595;
    }

    .bot:hover {
      background-color: #000;
      color: #fff;
    }
  }
}
</style>