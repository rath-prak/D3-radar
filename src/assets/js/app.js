// const data = [
//     { areaName: 'Auckland', newYears: 266217, waitangi: 15212, easter: 153323, anzac: 59871, queens: 70649, labour: 125668, xmas: 164329, boxing: 195414 },
//     { areaName: 'Christchurch City', newYears: 71847, waitangi: 16084, easter: 54650, anzac: 19295, queens: 54681, labour: 44709, xmas: 49704, boxing: 53885 },
//     { areaName: 'Dunedin City', newYears: 44014, waitangi: 7751, easter: 5110, anzac: 14865, queens: 23528, labour: 20476, xmas: 34287, boxing: 32927  },
//     { areaName: 'Hamilton City', newYears: 34373, waitangi: 13627, easter: 15363, anzac: 353, queens: 5732, labour: 16751, xmas: 22316, boxing: 24045  },
//     { areaName: 'Tauranga City', newYears: 30003, waitangi: 1756, easter: 6447, anzac: 936, queens: 15506, labour: 10533, xmas: 17536, boxing: 19883  },
//     { areaName: 'Wellington City', newYears: 87785, waitangi: 23128, easter: 43067, anzac: 25273, queens: 42555, labour: 46702, xmas: 87057, boxing: 87785  }
//   ]

  const data = [
    { areaName: 'Auckland', newYears: 266200, waitangi: 15200, easter: 153300, anzac: 59900, queens: null, labour: 125700, xmas: 164300, boxing: 195400 },
    { areaName: 'Christchurch City', newYears: 71800, waitangi: 16100, easter: 54700, anzac: 19300, queens: 54700, labour: 44700, xmas: 49700, boxing: 53900 },
    { areaName: 'Dunedin City', newYears: 44000, waitangi: 7800, easter: 5100, anzac: 14900, queens: 23500, labour: 20500, xmas: 34300, boxing: 32900  },
    { areaName: 'Hamilton City', newYears: 34400, waitangi: 13600, easter: 15400, anzac: null, queens: null, labour: 16800, xmas: 22300, boxing: 24000  },
    { areaName: 'Tauranga City', newYears: null, waitangi: null, easter: null, anzac: null, queens: 15500, labour: null, xmas: null, boxing: null  },
    { areaName: 'Wellington City', newYears: 87800, waitangi: 23100, easter: 43000, anzac: 25300, queens: 42600, labour: 46700, xmas: 87100, boxing: 87800  }
  ] 

  // reserve space for the axes and subtract that space
  // from the width and height properties so their values
  // accurately reflect the space available to the chart itself
  const margin = { top: 10, right: 10, bottom: 20, left: 150 }
  const width = 800 - margin.left - margin.right
  const height = 280 - margin.top - margin.bottom
  
  // create a scale to map scores to widths
  const xScale = d3.scaleLinear()
    .domain([0, 232491])
    .range([0, width])
  
  // create a scale to calculate bar height
  const yScale = d3.scaleBand()
    .domain(data.map(function(d) { return d.areaName }))
    .range([0, height])
  
  // this is just a condensed version of render()
  // from the previous example at http://bit.ly/2t2RJ0S
  // the commented lines are the only substantive changes
  function render(subject) {
    console.log("I'm rendering ", subject)  
    const bars = d3.select('#chart')
      .selectAll('div')
      .data(data, function(d) {
        return d.areaName
      })
    
    var newbar = bars.enter().append('div')
  
    newbar.append('p').classed("area-name",true).text((d) => d.areaName)
    newbar.append('div')
        .attr('class', 'bar')
        .style('width', 0)
        .style('height', function(d) {
          // use the height calculated by the band scale
          return yScale.bandwidth() - 2 + 'px'
        }).append('p').classed("area-value",true)
  
    var allbars = newbar.merge(bars)
        
    allbars.select(".bar")        
        .transition()
        .style('width', function(d) {
          // pass the score through the linear scale function
          return xScale(d[subject]) + 'px'
        })
        
    allbars.select(".area-value").text((d)=> d[subject])
            
  }
  
   render('waitangi')
  
  //   const svg = d3.select('#chart')
  //     .append('svg')
  //     .attr('width', width + margin.left + margin.right)
  //     .attr('height', height + margin.top + margin.bottom)
  //     .style('position', 'absolute')
  //     .style('top', 0)
  //     .style('left', 0)
  
  // create a group container and position it according to the margins
  // so subsequent commands are run from the correct coordinates
  //   const axisContainer = svg.append('g')
  //     .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  //   axisContainer.append('g')
  //     .attr('transform', `translate(0, ${height})`)
  //     .call(d3.axisBottom(xScale))
  
  //   axisContainer.append('g')
  //     .call(d3.axisLeft(yScale))
  
    
  d3.select("#waitangi").on('mouseover', () => render("waitangi"))
  d3.select("#easter").on('mouseover', () => render("easter")) 
  d3.select("#anzac").on('mouseover', () => render("anzac"))
  d3.select("#queensBday").on('mouseover', () => render("queens"))
  d3.select("#labourDay").on('mouseover', () => render("labour"))
  d3.select("#xmas").on('mouseover', () => render("xmas"))          
  d3.select("#boxing").on('mouseover', () => render("boxing"))
  d3.select("#newYears").on('mouseover', () => render("newYears"))   