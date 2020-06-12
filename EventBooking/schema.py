import graphene
import events.schema
import user.schema
import graphql_jwt

class Query(user.schema.Query,events.schema.Query,graphene.ObjectType):
    pass

# schema = graphene.Schema(query=Query)


class Mutation(user.schema.Mutation, events.schema.Mutation,graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)




