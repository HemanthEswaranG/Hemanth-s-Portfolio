import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Background: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr('width', width).attr('height', height);

    // Create random nodes
    const nodeCount = 40;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));

    // Draw nodes
    const circles = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill', '#6366f1') // Indigo-500
      .attr('opacity', 0.4);

    // Animation loop
    const timer = d3.timer(() => {
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
      });

      circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
      
      // Draw lines between close nodes
      svg.selectAll('line').remove();
      
      const links: {source: typeof nodes[0], target: typeof nodes[0], dist: number}[] = [];
      
      for(let i=0; i<nodes.length; i++) {
        for(let j=i+1; j<nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 150) {
                links.push({ source: nodes[i], target: nodes[j], dist });
            }
        }
      }

      svg.selectAll('line')
        .data(links)
        .enter()
        .insert('line', 'circle') // Insert before circles
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .attr('stroke', '#6366f1')
        .attr('stroke-width', 0.5)
        .attr('opacity', d => (150 - d.dist) / 150 * 0.2); // Fade out with distance

    });

    return () => {
      timer.stop();
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-slate-900">
        <svg ref={svgRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-slate-50 dark:from-transparent dark:to-slate-900 opacity-90"></div>
    </div>
  );
};

export default D3Background;