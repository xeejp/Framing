defmodule Framing.Main do
  alias Framing.Actions

  @pages ["waiting", "description", "experiment", "result"]
  @sequence ["question1", "question2", "answered"]

  def pages, do: @pages
  def sequence, do: @sequence

  def init do
    %{
      page: "waiting",
      participants: %{},
      joined: 0,
      answered: 0,
      oneone: 0,
      onetwo: 0,
      twoone: 0,
      twotwo: 0,
      question_text: %{
          'question': %{
              text: "アメリカはいま、アジア病という伝染病の大流行に備えていると想像してください。この流行の死者は、放置すれば600人に達すると見込まれています。対策として2種類のプログラムが提案されています。正確な科学的予想によれば、それぞれのプログラムの効果は次の通りです。",
           },
           'question1': %{
             text: "あなたはどちらのプログラムを選びますか？",
              title: ["プログラムA", "プログラムB"],
              question: [
                "200人が救われる。", 
                "1/3の確率で、600人が救われるが、2/3の確率で1人も助からない。"
              ]
            },
           'question2': %{
             text: "このような場合だと、あなたはどちらのプログラムを選びますか？",
             title: ["プログラムC", "プログラムD"],
             question: [
               "400人が死亡する。",
               "1/3の確率で1人も死なずにすむが、2/3の確率で600人が死亡する。"
             ]
            },
            'answered': %{
              text: "あなたの回答は終了しました。他の参加者の回答が終了するまでこのままお待ちください。",
           },
           'waiting_text': "参加者の登録を待っています。\nこの画面のまましばらくお待ちください。",
           'description_text': "これから、2つの質問をします。\n選択肢のうち、あなたが最も好むものを選択してください。",
          },
        }
  end

  def new_participant(data) do
    %{
      question_text: data.question_text,
      sequence: "question1",
      question1: 0,
      question2: 0,
      active: true,
      joined: 1,
      qswap: false,
      oneone: data.oneone,
      onetwo: data.onetwo,
      twoone: data.twoone,
      twotwo: data.twotwo,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(data)
      new = new |> Map.put(:joined, Map.size(data.participants) + 1)
      data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn {id, map} ->
        {id, Map.put(map, :joined, Map.size(data.participants) + 1)}
      end), %{}))
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end