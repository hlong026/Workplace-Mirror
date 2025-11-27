'use server';

import { GoogleGenAI, Schema, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    score: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 indicating the likelihood of PUA/manipulation. 0 is completely safe, 100 is severe manipulation.",
    },
    verdict: {
      type: Type.STRING,
      description: "A short verdict in Chinese, e.g., '正常沟通', 'PUA预警', '严重洗脑'. Maximum 4 characters.",
    },
    summary: {
      type: Type.STRING,
      description: "A brief summary of the analysis in Chinese.",
    },
    details: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3-5 specific points explaining the analysis in Chinese.",
    },
    advice: {
      type: Type.STRING,
      description: "Actionable advice for the employee in Chinese.",
    },
    tone: {
      type: Type.STRING,
      description: "Description of the speaker's tone, e.g., 'Aggressive', 'Passive-Aggressive', 'Professional'. In Chinese.",
    }
  },
  required: ["score", "verdict", "summary", "details", "advice", "tone"],
};

export async function analyzeContent(text: string, imageBase64: string | null): Promise<AnalysisResult> {
  const modelId = "gemini-2.5-flash"; 

  const promptText = `
    作为一位精通中国职场文化、组织行为学和沟通心理学的专家，请分析以下内容。
    
    你的任务是判断这段内容（文字或图片中的聊天记录）是否包含上级对下级的PUA（精神控制）、洗脑、过度压榨或情感操纵的迹象。
    
    请仔细体察语气、用词背后的动机以及权力不对等带来的压迫感。
    
    如果是图片，请先提取图片中的文字内容进行分析。
    
    分析维度包括但不限于：
    1. 否定打压（如：否定员工价值，人身攻击）
    2. 制造焦虑（如：威胁裁员，强调外界环境恶劣）
    3. 画饼充饥（如：空头承诺，谈理想不谈回报）
    4. 情感绑架（如：强调感恩，把公司当家）
    5. 边界侵犯（如：要求无偿加班，干涉私生活）

    请保持客观、冷静，并给出具体的分析理由和建议。请务必使用中文回答。
  `;

  try {
    const parts: any[] = [{ text: promptText }];

    if (text) {
      parts.push({ text: `需要分析的文字内容：\n${text}` });
    }

    if (imageBase64) {
      // Remove data URL prefix if present for the API call
      const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
      parts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: "image/png", 
        },
      });
      parts.push({ text: "请分析这张图片中的对话内容。" });
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No response text generated");
    }

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Analysis failed");
  }
}