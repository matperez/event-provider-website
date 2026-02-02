
import { GoogleGenAI } from "@google/genai";

/* Refactored to comply with @google/genai guidelines:
   - Always use new GoogleGenAI({apiKey: process.env.API_KEY})
   - Use response.text as a property (not a method)
*/
export const getEventRecommendations = async (userInput: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `Ты — профессиональный консьерж ивент-агентства "EventLux". 
        Твоя задача — помочь пользователю выбрать идеальный сценарий и площадку. 
        Общайся вежливо, вдохновляюще и профессионально на русском языке. 
        Площадки: 
        - Loft Industrial (стильный лофт в центре)
        - Grand Manor House (роскошный особняк с садом)
        - Azure Beach Club (пляжный клуб с бассейном)
        - Royal Cigar Lounge (элитный мужской клуб, дерево, кожа - для покера и казино)
        - The Cyber Arena (хай-тек площадка для лазертага и VR)
        - Woodland Spa & Grill (загородный отдых, баня, BBQ)
        
        Сценарии: Neon Cyberpunk Night, Классическая Сказка, Космическое Приключение, Покерная вечеринка, Алко-казино, Баня с шашлыками, Лазертаг-сражение, Турнир VR-игр.
        
        Если пользователь описывает свои желания, посоветуй комбинацию площадки и сценария. Будь креативен и аргументируй свой выбор!`,
      },
    });

    return response.text || "Извините, я не смог сформулировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при планировании события. Попробуйте еще раз позже.";
  }
};
