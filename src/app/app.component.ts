import { Component, OnInit, VERSION } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AppComponent implements OnInit {
  title = 'Mad Trucker';
  player = { name: '', fund: 0 };

  TRUCKS: any[];
  min: number;
  max: number;
  interval: number;
  timeout: number;
  timerId: any;
  raceStarted: boolean;
  wonAmount: number;
  game: boolean;
  setup: boolean;
  lowFund: boolean;
  fund: number;
  betplaced: boolean;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private appService: AppService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.resetValues();
  }

  get funds() {
    return Number(localStorage.getItem('fund'));
  }

  set funds(v: any) {
    localStorage.setItem('fund', v);
  }

  resetValues() {
    if (this.appService.getData) {
      this.appService.getData.subscribe((val) => {
        if (val) {
          this.player['name'] = val.name;
          this.fund = JSON.parse(JSON.stringify(val.fund));
          this.setupGame(val);
        }
      });
    }
    this.min = 1;
    this.interval = 100;
    this.timeout = 10100;
    this.raceStarted = false;
    this.timerId = null;
    this.wonAmount = null;
    this.game = false;
    this.setup = true;
    this.lowFund = false;
    this.betplaced = false;
    this.funds = 0;
    this.fund = 0;
  }

  setupGame(val) {
    this.game = true;
    this.setup = false;
    this.TRUCKS = JSON.parse(JSON.stringify(val['trucks']));
    this.max = this.TRUCKS.length;
    this.fund = this.funds;
  }

  startRace() {
    if (this.balanceFund() && this.betplaced) {
      this.lowFund = false;
      if (!this.timerId) {
        this.raceStarted = true;
        this.timerId = setInterval(() => {
          this.raceProgress();
        }, this.interval);
      } else {
        this.restart();
      }
    } else {
      this.lowFund = true;
    }
  }

  raceProgress() {
    const t = this.TRUCKS.find((o) => o.val == 100);
    if (t?.val === 100) {
      this.stopRace();
      t.won = true;
      this.playerFund();
    } else {
      const v = this.getRndTruck();
      this.TRUCKS[v - 1].val += 10;
    }
  }

  stopRace() {
    clearInterval(this.timerId);
    this.raceStarted = false;
    this.betplaced = false;
  }

  restart() {
    if (this.appService.getData) {
      this.appService.getData.subscribe((val) => {
        if (val) {
          this.setupGame(val);
        }
      });
    }
    this.min = 1;
    this.interval = 100;
    this.timeout = 10100;
    this.raceStarted = false;
    this.betplaced = false;
    this.timerId = null;
    this.wonAmount = null;
  }

  balanceFund() {
    const sum = this.TRUCKS.map((item) => item.bet).reduce(
      (prev, curr) => prev + curr,
      0
    );
    return Number(this.funds) - sum >= 0;
  }

  getRndTruck() {
    const t = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    return t;
  }

  reset() {
    this.stopRace();
    this.resetValues();
  }

  playerFund() {
    const b = this.TRUCKS.filter((o) => o.bet > 0);
    const w = this.TRUCKS.find((o) => o.won == true);
    let f = Number(this.fund);
    b.forEach((val, i) => {
      if (val.id == w.id) {
        f = f + val.bet;
        this.wonAmount = val.bet;
      }
    });
    this.fund = f;
    this.funds = this.fund;
  }

  placeBet(content) {
    this.restart();
    this.modalService.open(content, { centered: true });
  }

  setBets(e) {
    const t = this.TRUCKS.find((o) => o.id == e.id);
    t.bet = Number(e.bet);
  }

  betPlaced() {
    const sum = this.TRUCKS.map((item) => item.bet).reduce(
      (prev, curr) => prev + curr,
      0
    );
    this.betplaced = sum > 0 ? true : false;
    this.fund = this.fund - sum;
  }
}
