import OpenAI from "openai";
import { useState } from "react";

export interface IInput {
  country: string;
  type: "breakfast" | "lunch" | "dinner";
  info: string;
}

export interface IFood {
  title: string;
  description: string;
  receipe: {
    title: string;
    // 200ml, 200g, 2 pieces, etc
    quantity: string;
  }[];
  steps: string[];
}

export const useFetchFood = () => {
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const [food, setFood] = useState<IFood | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const fetch = async ({ country, type, info }: IInput) => {
    setLoading(true);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful cook designed to output JSON. Please give me some nice food receipe
            from the country ${country},
            for my ${type},
            {with this additional information: ${info};

            Please give me a JSON with this SCHEMA:
              {
                title: string;
                description: string;
                receipe: {
                  title: string;
                  // 200ml, 200g, 2 pieces, etc
                  quantity: string;
                }[]
                steps: string[]
              }
            `,
        },
        { role: "user", content: "Who won the world series in 2020?" },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      max_tokens: 4096,
    });

    if (completion.choices[0]?.message.content) {
      console.log("all message", completion.choices);
      setFood(JSON.parse(completion.choices[0].message.content));
      setLoading(false);
    }
  };

  return { food, loading, fetch };
};
