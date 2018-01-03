/**
 * Created by sunfei on 2017/2/23.
 */
import {MetricsPanelCtrl} from 'app/plugins/sdk';
import echarts from 'app/plugins/pili/echarts';

export class TreeMapCtrl extends MetricsPanelCtrl {
    constructor($scope, $injector, $rootScope) {
        super($scope, $injector);
        this.$rootScope = $rootScope;
        const treeMapDomId = "tree-map-dom-" + new Date().getTime();
        const panelDefaults = {
            textFontSetting: {
                fontSize: 10,
                color: '(255,255,255)',

            },
            borderSetting: {
                borderColor: '(0,0,0)',
                borderWidth: 1,

            },
            dataList: null,
            treeMapId: treeMapDomId,

        };

        _.defaults(this.panel, panelDefaults);
        this.events.on('render', this.onRender.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-error', this.onDataError.bind(this));
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

        this.didRenderThisComponent = false;
    }

    onInitEditMode() {
        this.addEditorTab('TreeOption', 'public/plugins/pili-treemap-panel/editor.html', 2);
    }

    onDataError() {
        console.log("data error!");
    }

    onRender() {
        this._updateSeries();
    }

    onDataReceived(dataList) {
        if (!this.didRenderThisComponent) {
            this._initSeries();
            this._treeMapChart = echarts.init(document.getElementById(this.panel.treeMapId));
            this._option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b}: {c}"
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : false,
                series : this._series,

            };
            this._treeMapChart.setOption(this._option);
        }

        this._changeData(dataList);

    }

    _changeData(dataList){
        var array = [];
        for (var data of dataList) {
            let str = data.target;
            var name = str.split(': ')[1].split('}')[0];
            var value = data.datapoints[0][0] * 100;
            var treeData = {name: name,
                value: value.toFixed(2)
            };
            array.push(treeData);
        }

        this._series[0].data = array;
        this._treeMapChart.setOption({
            series: this._series,
        });
    }
    _updateSeries(){
        var borderColor =  this._colorRGB2Hex(this.panel.borderSetting.borderColor);
        var textColor = this._colorRGB2Hex(this.panel.textFontSetting.color);
        if(!this._series){
            return;
        }
        this._series[0].itemStyle.normal.label.textStyle.color = textColor;
        this._series[0].itemStyle.normal.label.textStyle.fontSize = parseInt(this.panel.textFontSetting.fontSize);
        this._series[0].itemStyle.normal.borderWidth = parseInt(this.panel.borderSetting.borderWidth);
        this._series[0].itemStyle.normal.borderColor = borderColor;
        this._treeMapChart.setOption({
            series: this._series,
        });
    }


    _initSeries(){
        var borderColor =  this._colorRGB2Hex(this.panel.borderSetting.borderColor);
        var textColor = this._colorRGB2Hex(this.panel.textFontSetting.color);
        this._series = [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}",
                            textStyle: {
                                color: textColor,
                                fontSize: parseInt(this.panel.textFontSetting.fontSize)
                            }
                        },
                        borderWidth: parseInt(this.panel.borderSetting.borderWidth),
                        borderColor: borderColor,
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data:[],
            }
        ];
    }

    _colorRGB2Hex(color) {
        if(!color) return;
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);

        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }
}

TreeMapCtrl.templateUrl = 'module.html';
