Morris.Area({
    element: 'morris-area-chart2',
    data: [{
        period: '2017',
        SiteA: 0,
        SiteB: 0,

    }, {
        period: '2018',
        SiteA: 150,
        SiteB: 110,

    }, {
        period: '2019',
        SiteA: 50,
        SiteB: 60,

    }, {
        period: '2020',
        SiteA: 170,
        SiteB: 180,

    }, {
        period: '2021',
        SiteA: 140,
        SiteB: 130,

    }, {
        period: '2022',
        SiteA: 120,
        SiteB: 90,

    }, {
        period: '2023',
        SiteA: 250,
        SiteB: 150,

    }],
    xkey: 'period',
    ykeys: ['SiteA', 'SiteB'],
    labels: ['Site A', 'Site B'],
    pointSize: 0,
    fillOpacity: 0.4,
    pointStrokeColors: ['#b4becb', '#85b4d0'],
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    lineWidth: 0,
    smooth: false,
    hideHover: 'auto',
    lineColors: ['#b4becb', '#85b4d0'],
    resize: true

});
