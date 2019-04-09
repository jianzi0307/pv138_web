<template>
  <div class="container">
    <div :class="[wrapperCls,backgroundCls]" v-if="!loading && !error">
      <div class="card">
        <div class="card-title">
          <div class="card-title-avatar">
            <img class="avatar" :src="compInfo.avatar">
          </div>
          <div class="card-title-title">
            <div class="card-title-title-title">{{compInfo.nickname}}</div>
            <div class="card-title-title-subtitle">
              {{compInfo.comp_type === 0 ?
              '在法国ICD国际商学院完成了500米智能单车竞赛' :
              '在法国ICD国际商学院完成了500米智能赛艇竞赛'}}
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="grid">
            <div class="grid-title">用时</div>
            <div class="grid-value">
              <span>{{compInfo.time_len}}</span>
            </div>
          </div>
          <div class="grid">
            <div class="grid-title">{{compInfo.gender|gender}}排名</div>
            <div class="grid-value">
              <span>{{compInfo.rank}}</span>
              <span>
                /{{compInfo.gender === 'male'
                ? compInfo.comp_total_players_male
                : compInfo.comp_total_players_female}}
              </span>
            </div>
          </div>
          <div class="grid">
            <div class="grid-title">消耗热量</div>
            <div class="grid-value">
              <span>{{compInfo.cal}}</span>
              <span>kCal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="showTips error" v-else-if="error">
      <span>{{errorMsg}}</span>
    </div>
    <div class="showTips loading" v-else>
      <span>Loading...</span>
    </div>
    <div :class="[qrCls,qrSizeCls]" v-if="!loading && !error">
      <img :src="require(`@/assets/single/qr_${compInfo.comp_type}.png`)">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataService from '@/utils/data-service';

@Component({})
export default class CompScore extends Vue {
  protected wrapperCls: string = 'wrapper';
  protected backgroundCls: string = 'background0';

  protected qrCls: string = 'qr';
  protected qrSizeCls: string = 'qrSize0';

  protected loading: boolean = false;
  protected error: boolean = false;
  protected errorMsg: string = '';
  protected compInfo: any = {
    comp_id: '',
    comp_time: '',
    comp_name: '',
    comp_type: 0,
    comp_total_players_male: 0,
    comp_total_players_female: 0,
    nickname: '',
    avatar: '',
    time_len: '0',
    rank: 0,
    cal: 0,
    gender: 'male'
  };

  protected async mounted() {
    const query: any = this.$route.query;
    if (
      query.hasOwnProperty('user_id') &&
      query.user_id > 0 &&
      query.hasOwnProperty('comp_id') &&
      query.comp_id !== ''
    ) {
      this.loading = true;
      const userId: number = query.user_id;
      // const compType: number = query.comp_type || 0;
      const compId: string = query.comp_id;
      await this.getData(compId, userId);
    } else {
      this.showError('非法请求');
    }
  }

  protected async getData(compId: string, userId: number) {
    try {
      const dat = await DataService.instance.getUserCompScore(compId, userId);
      console.log(dat.data);
      const response = dat.data;
      if (response.errno !== 0) {
        this.showError(response.errmsg);
        return;
      }
      const compType: number = response.data.comp_type;
      this.backgroundCls = `background${compType}`;
      this.qrSizeCls = `qrSize${compType}`;
      this.compInfo = response.data;
      this.hideError();
    } catch (e) {
      this.showError(e.toString());
    }
    this.loading = false;
  }

  protected showError(msg: string) {
    this.error = true;
    this.errorMsg = msg;
  }

  protected hideError() {
    this.error = false;
    this.errorMsg = '';
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/base.scss";
.container {
  height: 100%;
  position: relative;
  z-index: 0;
}
.qr {
  position: absolute;
  right: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.qrSize0 {
  bottom: 0;
  width: 200px;
}
.qrSize1 {
  bottom: 0;
  width: 90px;
}
.showTips {
  color: #7a8a9a;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: torem(30px);
}
.background0 {
  background: url("https://resource.pkuvr.com/Public/h5/single/bg_0.jpg")
    no-repeat;
  background-size: cover;
  background-position: 100% 50%;
}
.background1 {
  background: url("https://resource.pkuvr.com/Public/h5/single/bg_1.jpg")
    no-repeat;
  background-size: cover;
  background-position: 100% 50%;
}

.wrapper {
  height: 100%;
  width: 100%;
  padding: 10px;
  z-index: 1;

  .card {
    color: #3a4a5a;
    border: solid 1px #999;
    border-radius: 5px;
    position: relative;
    top: 50%;
    background-color: white;
    padding: 15px;
    display: flex;
    flex-direction: column;
    z-index: 3;

    &-title {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      &-avatar {
        // border: solid 1px red;
        // flex: 1;
        padding: 0 5px 0 0;
        img {
          border: solid 1px grey;
          border-radius: 50%;
          width: 50px;
        }
      }

      &-title {
        flex: 4;
        display: flex;
        flex-direction: column;

        &-title {
          font-size: torem(40px);
          font-weight: bold;
        }
        &-subtitle {
          font-size: torem(25px);
          color: #999;
        }
      }
    }

    &-body {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      border-top: solid 1px #eee;
      padding-top: 10px;

      .grid {
        &-title {
          color: #aaa;
          font-size: torem(25px);
          text-align: center;
        }
        &-value {
          font-size: torem(25px);
          text-align: center;
          display: flex;
          flex-direction: row;
          align-items: baseline;

          span:first-child {
            font-size: torem(40px);
          }
        }
      }
    }
  }
}
</style>


