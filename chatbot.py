from llama_index import SimpleDirectoryReader, ListIndex, VectorStoreIndex, StorageContext, load_index_from_storage
from llama_index import ServiceContext
from llama_index.llms import OpenAI
import openai
import os
from dotenv import dotenv_values


# API Key
os.environ['OPENAI_API_KEY'] = dotenv_values()['OPENAI_API_KEY']
openai.api_key = dotenv_values()['OPENAI_API_KEY']


# Functions
def get_service_context():
    """
    This function defines the parameters of the large language model for use,
    in this case it is gpt 4
    Also provides utility function for the other functions.
    """
    chunk_size = 600
    num_outputs = 256
    context_window = 4096

    # define LLM
    llm = OpenAI(temperature=0.2, 
                 model="gpt-3.5-turbo", 
                 max_tokens=num_outputs, 
                 api_key=dotenv_values()['OPENAI_API_KEY']
                 )
    
    service_context = ServiceContext.from_defaults(
      llm=llm,
      chunk_size=chunk_size,
      context_window=context_window,
    ) 
    
    return service_context

def construct_index(directory_path):   
    """
    This function reads all the data and creates a vectorised JSON which is used
    by the chat bot to answer all the answers from the knowledge we have fed.
    """

    service_context = get_service_context()    

    documents = SimpleDirectoryReader(directory_path).load_data()
    index = VectorStoreIndex.from_documents(documents, service_context=service_context)
    index.storage_context.persist(persist_dir='./storage')
    return index

def ask_bot(query, input_index_dir='./storage'):
    """
    Function through which all the queries will be asked and provide a response to
    those queries. 
    """
    service_context = get_service_context()
    storage_context = StorageContext.from_defaults(persist_dir=input_index_dir)

    index = load_index_from_storage(storage_context, service_context=service_context)
    query_engine = index.as_query_engine(
        response_mode='compact',
        similarity_top_k=3, 
    )
    response = query_engine.query(query)
    response = str(response)
    print("Output: " + response)
    return response

# construct_index('knowledge/')
ask_bot('How can an oil spill occur in a water tank?')
