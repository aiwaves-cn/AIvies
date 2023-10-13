<template>
  <div class="box">
    <div class="header" :class="{ 'active_header': scrollTop }" ref="header">
      <p>
        <span><img v-if="scrollTop" src="../assets/logo.svg" alt=""><img v-else src="../assets/Agent logo.svg"
            alt=""></span>
        <span>{{ isEnglish ? 'AIWaves Agents' : 'AIWaves Agents' }}</span>
        <span>{{ isEnglish ? 'Home' : '首页' }}</span>
        <span>
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link" @click="push">
              {{ isEnglish ? 'Agents' : '机器人' }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in Allbot" :key="index" :command="item"
                @click="handleCommand(command)">{{ isEnglish ? item.desc.translate.botname : item.desc.botname
                }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <span class="new" @click="change_dialogVisible"><span>+</span>{{ isEnglish ? "Create" : "创建" }}</span>
        <span class="Toggle" @click="toggleLanguage"><i class="el-icon-sort" id="icon"></i>English/中文</span>
        <span class="min_Toggle" @click="toggleLanguage"><i class="el-icon-sort" id="icon"></i></span>
        <span class="min_meun" @click="drawer = true"><i class="el-icon-s-fold" id="icon"></i></span>
      </p>
    </div>
    <div class="main">
      <div class="main_one">
        <loginBgk>
        </loginBgk>
        <h1 class="title">{{ isEnglish ? 'AIWaves Agents' : 'AIWaves Agents' }}</h1>
        <h4 class="title_two">{{ isEnglish ? 'A Platform for Customizing LLM-based Autonomous Agents' :
          '随心定制配适任意场景的可控智能体系统'
        }}</h4>
        <h4 class="title_three" @click="innovation"> <dv-border-box-8 :reverse="true">{{ isEnglish ? 'Experience Now' :
          '立即体验' }} </dv-border-box-8>
        </h4>
      </div>
      <div class="mian_two">
        <p ref="p_one">🔍{{ isEnglish ? 'Overview' : '概览' }}</p>
        <p ref="p_two">{{ isEnglish ? `Agents is an open-source library/framework for building autonomous language agents.
          The library is carefully engineered to support important features including long-short term memory, tool usage,
          web navigation, multi-agent communication, and brand new features including human-agent interaction and symbolic
          control. With Agents, one can customize a language agent or a multi-agent system by simply filling in a config
          file in natural language and deploy the language agents in a terminal, a Gradio interface, or a backend
          service. One major difference between Agents and other existing frameworks for language agents is that our
          framework allows users to provide fine-grained control and guidance to language agents via an SOP (Standard
          Operation Process). An SOP defines subgoals/subtasks for the overall task and allows users to customize a
          fine-grained workflow for the language agents.`: `近一年来，随着大模型突飞猛进的发展，基于大模型的推理泛化能力的语言智能体(Language
          Agents)展示了通向AGI的巨大潜力。科研和开发者社区也涌现出各种语言智能体的框架和系统，如AutoGPT, LangChain,
          SuperAGI等。这些系统能够接受人类提供的简单的指令之后自主规划和执行任务。尽管看起来很炫酷，这些框架和系统的都存在一个非常致命的通病：智能体的运行一旦开始，就几乎脱离了人类的控制，对任务规划和执行一旦出错，就会通过误差传播引起明显的滚雪球效应，因此任务失败概率很高。除了失败率高以外，更致命的是用户或开发者遇到这种情况，对于如何调优很容易完全没有头绪，只能盲目更改任务描述，依靠玄学希望得到更好的效果。
          ` }}</p>
        <img ref="home_img" src="../assets/home.png" alt="">
        <p ref="p_three">{{ isEnglish ? "Highlights" : "突出点" }}</p>
        <p ref="p_four" style="color:#A0A0A0;"
          v-html="isEnglish ?
            `One major difference between Agents and other existing frameworks for language agents is that our framework
          allows users to provide fine-grained control and guidance to language agents via an SOP (Standard Operation
          Process). An SOP defines subgoals/subtasks for the overall task and allows users to customize a fine-grained
          workflow for the language agents.`:
            `<span>基于常用开源框架，如AutoGPT, LangChain, SuperAGI的智能体普遍存在规划和行为不可控的问题：这些智能体的运行一旦开始，就几乎脱离了人类的控制，对任务规划和执行一旦出错，就会通过误差传播引起明显的滚雪球效应，因此任务失败概率很高。除了失败率高以外，更致命的是用户或开发者遇到这种情况，对于如何调优很容易完全没有头绪，只能盲目更改任务描述，依靠玄学希望得到更好的效果。</span><br/><span>为了解决这个痛点，让LLM Agent更可控，调优LLM Agent的过程更简单更系统化，波形智能联合苏黎世联邦理工大学和浙江大学，开发了名为Agents的开源智能体框架。该框架创新性地提供了通过符号式的推理图，即“SOP”，来对任务进行分解，首次实现了对LLM Agent的细粒度控制。框架同时支持长短期记忆，工具使用，网络搜索，以及多智能体系统的构建，用户只需要用自然语言填写配置文档，就能轻松定义各种功能和使用场景的AI智能体/多智能体系统，比如导购机器人，客服机器人，以及包含各种角色的小说工作室！</span><br/><span>在支持零代码定制/微调多智能体系统的同时，Agents框架也对开发者和研究者扩展新的功能和定制复杂的多智能体环境/场景提供了很好的支持，为基于语言的智能体(Language Agents)研究提供便利。<span>`">
        </p>
        <p ref="p_fife">
          <span style="display: block; margin-bottom: 30px;">{{ isEnglish ? `The main functions and highlights of the Agents framework are as follows: ` : `Agents框架的主要功能和亮点如下：` }}</span>
          <span style="font-weight: 600;">{{ isEnglish ? `Tool Usage: ` : `长短期记忆：` }}</span>
          {{ isEnglish ?
            `Language agents in the library can use any external tools via function-calling and developers can
          add customized tools/APIs here.`:
            `基于RecurrentGPT[4]的方案让自主智能体能够维持长短期记忆，从而更好的和人类/环境/其他智能体交互。长期记忆将智能体自己的以及观察到的对话/行为历史储存在向量数据库(VectorDB)中并根据当前的观察(observation)，通过语义搜索(semantic
          search)来选择性的激活储存的记忆。短期记忆则是以文字形式，通过LLM+prompt进行更新，负责智能体的working memory。` }}

        </p>
        <p ref="p_six">
          <span style="font-weight: 600;">{{ isEnglish ? `Web Navigation: ` : `工具使用/网络搜索：` }}</span>
          {{ isEnglish ?
            `Language agents in the library can use search engines to navigate the web and get useful
          information.`:
            `我们通过将各种工具/API封装在"ToolComponent"类中，统一定义接口，让智能体能够通过OpenAI
          GPT的function-calling来智能地使用各种工具。网络搜索功能也被封装成了API，模型可以根据需求，通过function-calling自动生成搜索query，获取搜索结果来辅助行动。` }}

        </p>
        <p ref="p_sevn">
          <span style="font-weight: 600;">{{ isEnglish ? `Human-Agent interaction: ` : `人-智能体交互：` }}</span>
          {{ isEnglish ?
            `In addition to letting language agents communicate with each other in an
          environment, our framework seamlessly supports human users to play the role of the agent by himself/herself and
          input his/her own actions, and interact with other language agents in the environment.`:
            `Agents框架除了支持多智能体之间的相互交互，也支持了能够让人类使用者扮演多智能体系统中的一个或多个智能体的功能，可以方便地支持各种人-智能体交互的应用场景，如人和智能体一起玩游戏，辩论等。`
          }}
        </p>
        <p ref="p_eight">
          <span style="font-weight: 600;">{{ isEnglish ? `Symbolic Control: ` : `符号化细粒度控制：` }}</span>
          {{ isEnglish ?
            `Different from existing frameworks for language agents that only use a simple task
          description to control the entire multi-agent system over the whole task completion process, Agents allows users
          to use an SOP (Standard Operation Process) that defines subgoals/subtasks for the overall task to customize
          fine-grained workflows for the language agents.`:
            `作为Agents框架的核心亮点，框架中的SOP系统支持了通过符号化的推理图来对智能体/多智能体系统提供更细粒度的控制。一个任务/场景的SOP是一个图结构，图中的每个节点被称作"状态"，每个状态定义了该任务场景的一个子任务或者中间过程。用户可以在Agent系统的设置模版(config
          template)中定义每个智能体在每个状态中的任务描述，策略，规则，和in-context
          learning的样例等。状态和状态之间的切换通过一个基于LLM的控制器来决定。基于SOP的细粒度的控制让智能体系统更能够严格按照人类确认过的流程运行，从而更加稳定，可控，进而达到可以作为商业化的客服/销售/导购等智能体的目标。另外因为智能体系统的控制严格按照SOP的流程，所以任何一步发生问题，用户都可以方便的定位到问题所在，并且有针对性地对SOP进行修改，提升系统的表现，既提高了Agent系统的可解释性，又方便了系统的编辑和调优。`
          }}
        </p>
        <p ref="p_nine">
          <span style="font-weight: 600;">{{ isEnglish ? `Multi-agent Communication: ` : `多智能体系统：` }}</span>
          {{ isEnglish ?
            `In addition to single language agents, the library supports building multi-agent
          systems in which language agents can communicate with other language agents and the environment. Different from
          most existing frameworks for multi-agent systems that use pre-defined rules to control the order for agents'
          action, Agents includes a controller function that dynamically decides which agent will perform the next action
          using an LLM by considering the previous actions, the environment, and the target of the current states. This
          makes multi-agent communication more flexible.`:
            `Agents框架中同时支持单智能体和多智能体系统。其中多智能体系统区别于现有框架的一点是，不同于其他系统一般利用事先规定好的规则来决定智能体行动的先后顺序，Agents库当中支持了基于LLM的控制器，可以根据当前状态的目标，智能体的行为，和当前环境，来决定是否进入下一个状态，以及确定下一个行动的智能体应该是谁。`
          }}
        </p>
      </div>
    </div>
    <el-dialog :modal="true" :title="isEnglish ? 'Apply for Closed Beta' : '申请内测'" :visible.sync="dialogVisible"
      width="30%" center>
      <span slot="footer" class="dialog-footer">
        <el-form label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
          class="demo-ruleForm">
          <el-form-item>
            <template #label>
              <span class="required-label">
                <el-icon class="required-icon" name="star"></el-icon>
                {{ isEnglish ? "Your company (optional)" : "公司名称（选填）" }}
              </span>
            </template>
            <el-input v-model="ruleForm.company" autocomplete="off"
              :placeholder="isEnglish ? 'Enter company name (up to 30 characters)' : '请输入公司名称（最多30个字符）'"
              maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <template #label>
              <span class="required-label">
                <span style="color: red;">*</span>
                <el-icon class="required-icon" name="star"></el-icon>
                {{ isEnglish ? "Your name" : "您的姓名" }}
              </span>
            </template>
            <el-input v-model="ruleForm.name" autocomplete="off"
              :placeholder="isEnglish ? 'Enter name (up to 10 characters)' : '请输入姓名（最多10个字符）'" maxlength="10"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="isEnglish ? 'Position' : '位置'">
            <el-input v-model="ruleForm.position" autocomplete="off"
              :placeholder="isEnglish ? 'Enter position (up to 10 characters)' : '请输入职位（最多10个字符）'"
              maxlength="10"></el-input>
          </el-form-item> -->
          <el-form-item label="联系方式" prop="contact">
            <template #label>
              <span class="required-label">
                <span style="color: red;">*</span>
                <el-icon class="required-icon" name="star"></el-icon>
                {{ isEnglish ? "Phone number or email" : "联系方式（电话或邮箱）" }}
              </span>
            </template>
            <el-input v-model="ruleForm.contact" autocomplete="off"
              :placeholder="isEnglish ? 'Enter contact information' : '请输入联系方式'"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="isEnglish ? 'City' : '城市'">
            <el-input v-model="ruleForm.city" autocomplete="off"
              :placeholder="isEnglish ? 'Enter city (up to 10 characters)' : '请输入城市（最多10个字符）'" maxlength="10"></el-input>
          </el-form-item> -->
        </el-form>
        <el-button @click="dialogVisible = false">{{ isEnglish ? 'Cancel' : '取消' }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" style="background: #000000;">{{ isEnglish ? 'Confirm' :
          '确认' }}</el-button>
      </span>
    </el-dialog>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div v-for="(item, index) in Allbot" :key="index" class="bot" @click="handleCommand(item)">
        {{ isEnglish ? item.desc.translate.botname : item.desc.botname }}
      </div>
    </el-drawer>
  </div>
</template>

<script>
import particles from 'particles.js'
import PcParticles from '@/utis/particles.json'
import axiso from "axios"
import "../element_son.css";
import "../index.scss"
import { setToken, getToken } from '@/utis/storage'
import loginBgk from '@/components/loginBgk.vue'
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
      Allbot: "",
      value: '',
      isEnglish: true,
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
      scrollTop: 0,
      baseURL: '',
      drawer: false
    }
  },
  components: {
    loginBgk,
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      // this.baseURL = 'http://192.168.110.200:18876'
      this.baseURL = 'http://aiwaves-agents.com:9099/agent-factory-api'
    } else {
      this.baseURL = 'http://aiwaves-agents.com:9099/agent-factory-api'
    }
    this.setLanguage()
    // particlesJS("particlesId", PcParticles)
    window.addEventListener("scroll", this.handleScroll) //页面监听滑动
    axiso({
      method: "get",
      url: this.baseURL + "/api/v1/bot/get_public_bots",
    }).then(res => {
      this.Allbot = res.data
    })
  },
  methods: {
    setLanguage () {
      if (getToken('isEnglish') !== undefined) {
        if (getToken('isEnglish') === 'false') {
          this.isEnglish = false
        } else {
          this.isEnglish = true
        }
      }
    },
    push () {
      this.$router.push("/about")
      // if (localStorage.getItem("token")) {
      // } else {
      //   this.dialogVisible = true
      // }
    },
    change_dialogVisible () {
      if (localStorage.getItem("token")) {
      } else {
        this.dialogVisible = true
      }
    },
    handleScroll () {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.scrollTop = scrollTop
      // if (scrollTop > 0) {
      //   const header = this.$refs.header
      //   header.style.background = "#fff"
      //   header.style.color = "red"
      //   header.style.zIndex = '9999'
      // }
      // if (scrollTop > 0) {
      //   const header = this.$refs.header
      //   header.removeAttribute('style');
      //   header.style.backgroundColor = 'rgba(0,0,0,0.6)'; /* 滚动时头部背景色为黑色 */
      //   header.classList.add('scroll-header');
      //   header.style.webkitBackdropFilter = 'blur(10px)';
      //   header.style.backdropFilter = 'blur(10px)';
      //   /* 使用标准的 backdrop-filter 属性 */
      //   // header.style.webkit - backdropFilter= 'blur(20px)';
      // } else {
      //   const header = this.$refs.header
      //   header.style.backgroundColor = 'inherit'; /* 不滚动时继承父元素的背景色 */
      //   header.style.color = '#FFF'; /* 不滚动时字体颜色为白色 */
      //   header.classList.remove('scroll-header');
      // }
      if (scrollTop >= 350) {
        const p_one = this.$refs.p_one
        p_one.style.opacity = 1;
        p_one.style.transform = "translateX(0)";
      }
      if (scrollTop >= 400) {
        const p_two = this.$refs.p_two
        p_two.style.opacity = 1;
        p_two.style.transform = "translateX(0)";
      }
      if (scrollTop >= 400) {
        const home_img = this.$refs.home_img
        home_img.style.opacity = 1;
        home_img.style.transform = "translateX(0)";
      }
      if (scrollTop >= 450) {
        const p_three = this.$refs.p_three
        p_three.style.opacity = 1;
        p_three.style.transform = "translateX(0)";
      }
      if (scrollTop >= 500) {
        const p_four = this.$refs.p_four
        p_four.style.opacity = 1;
        p_four.style.transform = "translateX(0)";
      }
      if (scrollTop >= 550) {
        const p_fife = this.$refs.p_fife
        p_fife.style.opacity = 1;
        p_fife.style.transform = "translateX(0)";
      }
      if (scrollTop >= 650) {
        const p_six = this.$refs.p_six
        p_six.style.opacity = 1;
        p_six.style.transform = "translateX(0)";
      }
      if (scrollTop >= 700) {
        const p_sevn = this.$refs.p_sevn
        p_sevn.style.opacity = 1;
        p_sevn.style.transform = "translateX(0)";
      }
      if (scrollTop >= 750) {
        const p_eight = this.$refs.p_eight
        p_eight.style.opacity = 1;
        p_eight.style.transform = "translateX(0)";
      }
      if (scrollTop >= 800) {
        const p_nine = this.$refs.p_nine
        p_nine.style.opacity = 1;
        p_nine.style.transform = "translateX(0)";
      }
    },
    toggleLanguage () {
      this.isEnglish = !this.isEnglish;
      setToken('isEnglish', this.isEnglish)
    },
    innovation () {
      this.$router.push("/about")
    },
    handleCommand (command) {
      this.$router.push({
        path: `/botlist`,
        query: { name: command.desc.botname }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>
.header {
  p {
    span {
      cursor: pointer;
      color: #fff;
      border-color: #fff !important;
    }
  }

  ::v-deep .el-dropdown {
    span {
      color: #fff !important;
    }
  }
}

.active_header {
  background-color: #fff;

  p {
    span {
      color: #000;
      border-color: #000 !important;
    }
  }

  ::v-deep .el-dropdown {
    span {
      color: #000 !important;
    }
  }
}

::v-deep .main_one {
  position: relative;
  width: 100%;
  height: 600px;
  // background: linear-gradient(0deg, rgb(7, 33, 99), rgb(3, 17, 51));
  // background: linear-gradient(0deg, rgb(3, 17, 51), rgb(3, 17, 51));
  background-color: #222;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  h1 {
    position: relative;
    z-index: 10;
  }

  h4 {
    position: relative;
    z-index: 10;
  }

  #iviewBg {
    position: absolute;
    top: 0;
    left: 0;

    canvas {
      position: relative;
      z-index: 0;
    }
  }

  // canvas {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  // }
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