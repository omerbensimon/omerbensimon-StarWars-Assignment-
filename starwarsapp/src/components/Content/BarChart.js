import React from 'react';

const Chart = ({ children, width, height }) => (
  <svg viewBox={`0 0 ${width} ${height + 20}`} width={width} height={height + 40}>
    {children}
  </svg>
)

const Bar = ({ x, y, width, height, name, value }) => (
  <>
    <text x={x} y={y - 20} class="heavy">{value}</text>
    <text x={x} y={580} class="heavy">{name}</text>
    <rect x={x} y={y} width={width} height={height} />
  </>
)
export function BarChart({ populationPlanetData }) {
  const data = []
  var i = 0;
  let kyes = [...populationPlanetData.keys()]
  let value = [...populationPlanetData.values()]
  while (i < kyes.length) {
    data[i] = ({ name: kyes[i], repos: value[i] })
    i++;
  }

  // Width of each bar
  const itemWidth = 20

  // Distance between each bar
  const itemMargin = 70

  const dataLength = data.length

  // Normalize data, we'll reduce all sizes to 25% of their original value
  const massagedData = data.map(datum =>
    Object.assign({}, datum, { repos: datum.repos * 0.00000010 })

  )

  const mostRepos = massagedData.reduce((acc, cur) => {
    const { repos } = cur
    return repos > acc ? repos : acc
  }, 0)

  const chartHeight = mostRepos + 100

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Chart width={dataLength * (itemWidth + itemMargin)} height={chartHeight}>
        {massagedData.map((datum, index) => {
          const itemHeight = datum.repos
          return (

            <Bar
              x={index * (itemWidth + itemMargin)}
              y={chartHeight - itemHeight}
              width={60}
              height={itemHeight}
              name={data[index].name}
              value={data[index].repos}
            />
          )
        })}
      </Chart>
    </div>
  )
}