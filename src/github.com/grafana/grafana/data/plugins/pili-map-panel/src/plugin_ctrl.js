import {MetricsPanelCtrl} from 'app/plugins/sdk';
import './dark_theme';
import _ from 'lodash';

import MapChart from './map_chart';
import TopChart from './top_chart';

export class PluginCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector, $rootScope) {
        super($scope, $injector);
        this.$rootScope = $rootScope;

        const mapDomId = "map-dom-" + new Date().getTime();
        const topDomId = "top-dom-" + new Date().getTime();


      var panelDefaults = {
            pieType: 'pie',
            legend: {
                show: true, // disable/enable legend
                values: true
            },
            links: [],
            datasource: null,
            maxDataPoints: 3,
            interval: null,
            targets: [{}],
            cacheTimeout: null,
            nullPointMode: 'connected',
            legendType: 'Under graph',
            aliasColors: {},
            format: 'short',
            valueName: 'current',
            strokeWidth: 1,
            fontSize: '80%',
            mapDomId: mapDomId,
            topDomId: topDomId,
            combine: {
                threshold: 0.0,
                label: 'Others'
            }
        };

        _.defaults(this.panel, panelDefaults);
        _.defaults(this.panel.legend, panelDefaults.legend);

        this.events.on('render', this.onRender.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
        this.events.on('data-error', this.onDataError.bind(this));
        // this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

        this._mapChart = new MapChart(this.panel.mapDomId);
        this._topChart = new TopChart(this.panel.topDomId);
        this._didRenderThisComponent = false;
        this.render();
    }

    setUnitFormat(subItem) {

    }

    changeSeriesColor(series, color) {
        series.color = color;
    }

    onDataReceived(dataList) {
        let mapOption = {},
            topOption = {};
        dataList = this._parseData(dataList);

        if (!this._didRenderThisComponent) {
            mapOption = this._mapChart.setupOption();
            topOption = this._topChart.setupOption();
            this._didRenderThisComponent = true;
        }
        this._mapChart.updateDataList(mapOption, dataList);
        this._topChart.updateDataList(topOption, dataList);
    }

    _parseData(dataList) {
        return dataList.map(({target, datapoints}) => {
            const targetMatcher = target.match(/\{.+}/);
            if (!targetMatcher) {
                return;
            }
            let targetObj = targetMatcher[0];
            if (!targetObj) {
                return;
            }
            targetObj = this._parseTargetObjString(targetObj);
            const value = datapoints[0][0];

            return {targetObj, value};
        });
    }

    _parseTargetObjString(strObj) {
        const obj = {};
        const trim = s => s.replace(/(^\s+|\s+$)/, '');
        strObj.replace(/(\{|\})/g, '').split(',').forEach(cell => {
            const [key, value] = trim(cell).split(':').map(trim);
            obj[key] = value;
        });
        return obj;
    }

    onDataError() {
        console.error(`fail to load database`)
    }

    onRender() {
    }
}

PluginCtrl.templateUrl = 'module.html';
