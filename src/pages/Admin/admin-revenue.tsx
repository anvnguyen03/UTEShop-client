import { Chart } from 'primereact/chart'
import React, { useEffect, useState } from 'react'
import * as api from "../../api/api"

const AdminRevenue: React.FC = () => {

    const [totalIncomes, setTotalIncomes] = useState()
    const [totalUsers, setTotalUsers] = useState()
    const [successOrders, setSuccessOrders] = useState()
    const [chartRevenueData, setChartRevenueData] = useState({})
    const [chartRevenueOptions, setChartRevenueOptions] = useState({})
    const [chartUserData, setChartUserData] = useState({})
    const [chartUserOptions, setChartUserOptions] = useState({})
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        const fetchGeneralStatistics = async () => {
            const response: any = await api.getGeneralStatistics()
            if (response.statusCode === 200) {
                setTotalIncomes(response.data.totalIncomes)
                setTotalUsers(response.data.totalUsers)
                setSuccessOrders(response.data.successOrders)
            }
        }
        fetchGeneralStatistics()
    })

    useEffect(() => {
        const fetchRevenueStatistics = async () => {
            const data = {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Sales - $USD',
                        data: [0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }
                ]
            }
            const options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

            const response: any = await api.getRevenueStatistics()
            if (response.statusCode === 200) {
                data.datasets[0].data = response.data
            }

            setChartRevenueData(data);
            setChartRevenueOptions(options);
        }

        fetchRevenueStatistics()
    }, [])

    useEffect(() => {
        const fetchUsersStatistics = async () => {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            const data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Total Users',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: 'New Users',
                        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            const response: any = await api.getUsersStatistics(currentYear)
            if (response.statusCode === 200) {
                data.datasets[0].data = response.data.totalUsers
                data.datasets[1].data = response.data.newUsers
            }

            setChartUserData(data);
            setChartUserOptions(options);
        }

        fetchUsersStatistics()
    }, [])

    return (
        <div className="content-wrap p-4 h-screen">
            <div className="grid mb-2">
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Incomes</span>
                                <div className="text-900 font-medium text-xl">${totalIncomes}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-dollar text-blue-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Users</span>
                                <div className="text-900 font-medium text-xl">{totalUsers}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-user text-cyan-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="statistic-card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Success Orders </span>
                                <div className="text-900 font-medium text-xl">{successOrders}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center
                                 bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-verified text-green-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid mb-2">
                <div className="col-12">
                    <div className="statistic-card mb-0">
                        <span className="block text-green-500 font-bold mb-3 text-center">Incomes {currentYear}</span>
                        <Chart type="bar" data={chartRevenueData} options={chartRevenueOptions} />
                    </div>
                </div>
            </div>

            <div className="grid mb-2">
                <div className="col-12">
                    <div className="statistic-card mb-0">
                        <span className="block text-green-500 font-bold mb-3 text-center">Users {currentYear}</span>
                        <Chart type="bar" data={chartUserData} options={chartUserOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRevenue