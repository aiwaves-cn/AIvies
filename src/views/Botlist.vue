<template>
    <div class="box">
        <div class="header">
            <p>
                <span @click="home"><img src="../assets/logo.svg" alt=""></span>
                <span @click="home">{{ isEnglish ? 'AIWaves Agents' : 'AIWaves Agents' }}</span>
                <span @click="home">{{ isEnglish ? 'Home' : '首页' }}</span>
                <span>

                    <el-dropdown trigger="hover" @command="handleCommand">
                        <span class="el-dropdown-link" @click="push">
                            {{ isEnglish ? 'Agents' : '机器人' }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, index) in Allbot" :key="index" :command="item"
                                @click="handleCommand(command)">{{ isEnglish ? item.desc.translate.botname :
                                    item.desc.botname
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
            <div class="dl">
                <div class="dt">
                    <video :src="`${baseURL}${data.video}`" autoplay controls muted></video>
                </div>
                <div class="dd">
                    <h2 style="margin-bottom: 17%;">{{ isEnglish ? data.translate?.botname : data?.botname }}</h2>
                    <p style="margin-bottom: 9%;">{{ isEnglish ? 'Task：' + data.translate?.task : '任务：' + data?.task
                    }}</p>
                    <p style="margin-bottom: 18%;">{{ isEnglish ? 'Capabilities：' + data.translate?.ability : '功能：' +
                        data?.ability }}</p>
                    <p @click="chat(data?.botname)"
                        v-html="isEnglish ? 'Chat Now <i class=&quot;el-icon-right&quot;></i>' : '立即体验<i class=&quot;el-icon-right&quot;></i>'">
                    </p>
                </div>
            </div>
        </div>
        <el-dialog :modal="true" :title="isEnglish ? 'Apply for Closed Beta' : '申请内测'" :visible.sync="dialogVisible"
            width="30%" center>
            <span slot="footer" class="dialog-footer">
                <el-form label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                    label-width="100px" class="demo-ruleForm">
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
                            :placeholder="isEnglish ? 'Enter name (up to 10 characters)' : '请输入姓名（最多10个字符）'"
                            maxlength="10"></el-input>
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
                <el-button type="primary" @click="submitForm('ruleForm')" style="background: #000000;">{{ isEnglish ?
                    'Confirm' :
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
import axiso from "axios"
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
            data: {},
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
        push () {
            this.$router.push("/about")
        },
        home () {
            this.$router.push("/")
        },
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
                path: `/botlist`,
                query: { name: command.desc.botname }
            })
            this.setLanguage()
            this.get_public_bots()
        },
        chat () {
            if (localStorage.getItem("token")) {
                this.$router.push({
                    path: "/dialogue",
                    query: { name: this.data.botname }
                })
            } else {
                this.dialogVisible = true
            }
        },
        async get_public_bots () {
            await axiso({
                method: "get",
                url: this.baseURL + "/api/v1/bot/get_public_bots",
            }).then(res => {
                console.log(res.data);
                this.Allbot = res.data
                console.log(this.Allbot);
                this.Allbot.forEach((item, index) => {
                    if (item.desc?.botname === this.$route.query.name) {
                        this.data = item.desc
                        console.log(this.data);
                    }
                })
            })
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
                        console.log(this.ruleForm.contact)
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
        this.get_public_bots()
    },
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
            top: 0;
            box-shadow: 0px 2px 4px 0px rgba(150, 150, 150, 0.5);
            background-color: #fff;

            p {
                width: 80%;
                color: #000;
                display: flex;
                align-items: center;
                margin-left: 15px;
                margin-top: 10px;

                .el-dropdown-link {
                    color: #000 !important;
                    margin-left: 15px !important;
                }

                span:nth-child(2) {
                    font-size: 25px;
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
                    margin-left: 5px;
                    margin-right: 5px;
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
            padding-top: 100px;
            width: 100vw;
            min-height: 100vh;
            text-align: center;
            color: #333333;

            .dl {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-right: 200px;
                padding-left: 200px;
                height: 100vh;

                @media screen and (max-width: 800px) {
                    padding: 0;
                    flex-direction: column;
                    width: 100%;
                }

                .dt {
                    height: 80vh;
                    flex: 1;
                    // padding: 10% 15%;
                    // border: 1px solid #979797;
                    border-radius: 8px;
                    position: relative;

                    @media screen and (max-width: 800px) {
                        margin-bottom: 20px;
                        display: inline-block;
                        height: auto;
                        min-width: 100vw;
                    }

                    video {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                    }

                    //所有控件
                    video::-webkit-media-controls-enclosure {
                        display: none;
                    }
                }

                .dd {
                    margin-left: 150px;
                    flex: 1;
                    text-align: left;

                    @media screen and (max-width: 800px) {
                        padding: 0 18px;
                        margin-left: 0px;
                    }

                    h2 {
                        font-size: 40px;

                        @media screen and (max-width: 800px) {
                            margin-bottom: 12px !important;
                            font-size: 20px;
                        }
                    }

                    p {
                        font-size: 26px;

                        @media screen and (max-width: 800px) {
                            margin-bottom: 15px !important;
                            font-size: 14px;
                        }
                    }

                    p:nth-child(4) {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        width: 160px;
                        padding: 13px 14px 13px 30px;
                        text-align: center;
                        border: solid 1px #000;
                        border-radius: 30px;

                        @media screen and (max-width: 800px) {
                            display: flex;
                            justify-content: center;
                            box-sizing: border-box;
                            margin: 0 auto;
                            padding: 0;
                            width: 264px;
                            height: 45px;
                            border-radius: 30px;
                            border: 1px solid #333333;
                        }
                    }

                    p:nth-child(4):hover {
                        background: #000;
                        color: #fff;
                    }
                }
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