"use client";

import React from "react";
import { ArrowRight, ArrowLeftRight, CheckCircle2, Layers, Cpu, Cloud, Database, Globe, Smartphone, Zap, Sparkles, Activity, ShieldCheck, Box } from "lucide-react";
import { ArchitectureFlow } from "@/data/industryData";

interface TechFlowDiagramProps {
  flow: ArchitectureFlow;
  accentColor?: string;
}

// Icon mapping helper for visual appeal
const getStepIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("ai") || lower.includes("model")) return Sparkles;
  if (lower.includes("cloud")) return Cloud;
  if (lower.includes("data") || lower.includes("analytics") || lower.includes("analyze")) return Database;
  if (lower.includes("api") || lower.includes("integration") || lower.includes("connect")) return Zap;
  if (lower.includes("mobile")) return Smartphone;
  if (lower.includes("web") || lower.includes("portal") || lower.includes("commerce")) return Globe;
  if (lower.includes("application") || lower.includes("product") || lower.includes("mvp")) return Layers;
  if (lower.includes("secure") || lower.includes("shield")) return ShieldCheck;
  if (lower.includes("system") || lower.includes("existing")) return Box;
  return Cpu;
};

export const TechFlowDiagram: React.FC<TechFlowDiagramProps> = ({ flow, accentColor = "#27A7A2" }) => {
  if (flow.type === "triplet") {
    return (
      <div className="w-full my-8 p-6 sm:p-8 rounded-2xl bg-[#091E34]/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div 
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: accentColor }}
        />
        
        {flow.label && (
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#6FD7B7] font-bold">
              {flow.label}
            </h4>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flow.steps.map((tripletString, idx) => {
            const parts = tripletString.split("↔").map(p => p.trim());
            return (
              <div 
                key={idx}
                className="group relative flex flex-col justify-between p-5 rounded-xl bg-[#0B2540]/90 border border-white/10 hover:border-[#6FD7B7]/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-[11px] font-mono text-white/40 mb-3 uppercase tracking-wider font-semibold">
                  Layer 0{idx + 1} Pipeline
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-2">
                  {parts.map((part, pIdx) => {
                    const Icon = getStepIcon(part);
                    return (
                      <React.Fragment key={pIdx}>
                        <div className="flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-200">
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#6FD7B7] mb-2 shadow-inner">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                            {part}
                          </span>
                        </div>
                        {pIdx < parts.length - 1 && (
                          <div className="text-[#6FD7B7]/60 flex items-center justify-center rotate-90 sm:rotate-0">
                            <ArrowLeftRight className="w-4 h-4" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-white/50 text-center font-mono">
                  Bidirectional System Integration
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-2xl bg-[#091E34]/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      {flow.label && (
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          <h4 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#6FD7B7] font-bold">
            {flow.label}
          </h4>
        </div>
      )}

      {/* Responsive Step Flow Container */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 relative">
        {flow.steps.map((step, idx) => {
          const Icon = getStepIcon(step);
          const isLast = idx === flow.steps.length - 1;

          return (
            <React.Fragment key={idx}>
              {/* Node Card */}
              <div className="flex-1 min-w-[130px] p-4 sm:p-5 rounded-xl bg-[#0B2540]/90 border border-white/10 hover:border-[#6FD7B7]/50 hover:bg-[#0D2D4D] transition-all duration-300 shadow-md group">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#6FD7B7] group-hover:text-white group-hover:bg-[#27A7A2]/30 transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <div className="text-sm font-bold text-[#F8FBFC] group-hover:text-[#6FD7B7] transition-colors duration-200 leading-snug">
                  {step}
                </div>
              </div>

              {/* Connecting arrow */}
              {!isLast && (
                <div className="flex items-center justify-center text-[#6FD7B7]/70 py-1 lg:py-0 shrink-0">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center rotate-90 lg:rotate-0 group">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs text-white/50 font-mono">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#6FD7B7]" />
          Verified Architecture Integration
        </span>
        <span className="text-white/40">
          Continuous Pipeline & Automation
        </span>
      </div>
    </div>
  );
};
